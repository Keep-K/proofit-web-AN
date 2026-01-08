'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/lib/api'
import { getStorageJSON, getStorageItem, setStorageJSON } from '@/lib/storage'

export default function HomePageContent() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [stats, setStats] = useState({
    thisWeekWorkouts: 0,
    upcomingPlans: 0,
    completedWorkouts: 0,
    weeklyProgress: 0,
  })
  const [todayChecklist, setTodayChecklist] = useState({
    planner: '0 items',
    workoutLog: 'No records',
    calories: '0 / 2000 kcal',
    body: 'Not recorded',
  })

  const calculateStats = useCallback(() => {
    try {
      const logs = getStorageJSON<Array<{ date: string; exercises?: unknown[] }>>('workout_logs', [])
      const plannerItems = getStorageJSON<
        Array<{ start_at: string; status: string }>
      >('planner_items', [])

      const thisWeek = getWeekDates()
      const thisWeekWorkouts = logs.filter((log) => {
        const logDate = new Date(log.date)
        return logDate >= thisWeek.start && logDate <= thisWeek.end
      }).length

      const upcomingPlans = plannerItems.filter((item) => {
        const startAt = new Date(item.start_at)
        return startAt >= new Date() && item.status === 'scheduled'
      }).length

      const completedWorkouts = plannerItems.filter((item) => item.status === 'done').length

      const weeklyGoal = parseInt(getStorageItem('weekly_workout_goal') || '5', 10)
      const workoutProgress = weeklyGoal > 0 ? Math.min(100, (thisWeekWorkouts / weeklyGoal) * 100) : 0
      const completionProgress =
        completedWorkouts > 0
          ? Math.min(100, (completedWorkouts / Math.max(thisWeekWorkouts, 1)) * 100)
          : 0
      const weeklyProgress = Math.round(workoutProgress * 0.7 + completionProgress * 0.3)

      setStats({
        thisWeekWorkouts,
        upcomingPlans,
        completedWorkouts,
        weeklyProgress,
      })

      updateTodayChecklist()
    } catch (error) {
      console.error('Error calculating stats:', error)
    }
  }, [])

  const updateTodayChecklist = useCallback(() => {
    try {
      const todayStr = new Date().toISOString().split('T')[0]

      const plannerItems = getStorageJSON<
        Array<{ start_at: string; status: string }>
      >('planner_items', [])
      const todayPlans = plannerItems.filter((item) => {
        const itemDate = new Date(item.start_at)
        return itemDate.toISOString().split('T')[0] === todayStr
      })
      const todayScheduled = todayPlans.filter((i) => i.status === 'scheduled').length
      const todayDone = todayPlans.filter((i) => i.status === 'done').length

      const plannerText =
        todayPlans.length === 0
          ? 'No schedule today'
          : `Scheduled: ${todayScheduled} · Done: ${todayDone}`

      const logs = getStorageJSON<Array<{ date: string; exercises?: unknown[] }>>('workout_logs', [])
      const todayLog = logs.find((l) => l.date === todayStr)
      const workoutLogText = !todayLog
        ? 'No records'
        : `${todayLog.exercises?.length || 0} exercises logged`

      const goal = getStorageJSON<{ target?: number }>('calorie_goal', {})
      const target = goal?.target ? goal.target : 2000
      const nutritionLogs = getStorageJSON<
        Array<{ date: string; items: Array<{ calories?: number }> }>
      >('nutrition_logs', [])
      const todayNutrition = nutritionLogs.find((l) => l.date === todayStr)
      const consumed = todayNutrition
        ? todayNutrition.items.reduce((sum, it) => sum + (it.calories || 0), 0)
        : 0
      const caloriesText = `${consumed} / ${target} kcal`

      const measurements = getStorageJSON<
        Array<{ date: string; weight?: number }>
      >('body_measurements', [])
      const todayMeasurement = measurements
        .slice()
        .reverse()
        .find((m) => {
          const d = new Date(m.date)
          return d.toISOString().split('T')[0] === todayStr
        })
      const bodyText = todayMeasurement
        ? `Recorded (${todayMeasurement.weight}kg)`
        : 'Not recorded'

      setTodayChecklist({
        planner: plannerText,
        workoutLog: workoutLogText,
        calories: caloriesText,
        body: bodyText,
      })
    } catch (error) {
      console.error('Error updating today checklist:', error)
    }
  }, [])

  useEffect(() => {
    const token = getAccessToken()
    setIsConnected(!!token)
    if (token) {
      calculateStats()
    }

    const handleWalletConnected = () => {
      setIsConnected(true)
      calculateStats()
    }

    const handleWalletDisconnected = () => {
      setIsConnected(false)
      setStats({
        thisWeekWorkouts: 0,
        upcomingPlans: 0,
        completedWorkouts: 0,
        weeklyProgress: 0,
      })
    }

    window.addEventListener('walletConnected', handleWalletConnected)
    window.addEventListener('walletDisconnected', handleWalletDisconnected)
    window.addEventListener('plannerUpdated', calculateStats)
    window.addEventListener('goalsUpdated', calculateStats)
    window.addEventListener('nutritionUpdated', calculateStats)
    window.addEventListener('bodyUpdated', calculateStats)

    return () => {
      window.removeEventListener('walletConnected', handleWalletConnected)
      window.removeEventListener('walletDisconnected', handleWalletDisconnected)
      window.removeEventListener('plannerUpdated', calculateStats)
      window.removeEventListener('goalsUpdated', calculateStats)
      window.removeEventListener('nutritionUpdated', calculateStats)
      window.removeEventListener('bodyUpdated', calculateStats)
    }
  }, [calculateStats])


  const getWeekDates = () => {
    const now = new Date()
    const day = now.getDay()
    const diff = now.getDate() - day
    const start = new Date(now.setDate(diff))
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    end.setHours(23, 59, 59, 999)
    return { start, end }
  }

  const handleConnectWallet = () => {
    const btn = document.getElementById('btnWallet') as HTMLButtonElement
    btn?.click()
  }

  const circumference = 2 * Math.PI * 72
  const offset = circumference - (stats.weeklyProgress / 100) * circumference

  return (
    <div className="page active">
      {!isConnected ? (
        <div id="home-not-connected" className="home-hero home-hero--disconnected">
          <div className="home-hero-inner">
            <div className="home-hero-kicker">Proofit</div>
            <h1 className="home-hero-title">Plan, track, and grow your fitness journey.</h1>
            <p className="home-hero-subtitle">Connect your MetaMask wallet to use the service.</p>
            <div className="home-hero-actions">
              <button className="btn-primary" type="button" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={() => router.push('/proofit/planner')}
              >
                View Planner
              </button>
              <button className="btn-secondary" type="button" onClick={() => router.push('/proofit/chat')}>
                AI Coach
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div id="home-connected" className="home-dashboard">
          <div className="home-hero home-hero--connected">
            <div className="home-hero-inner">
              <div className="home-hero-kicker">Dashboard</div>
              <h1 className="home-hero-title">Your weekly workout at a glance.</h1>
              <p className="home-hero-subtitle">Key metrics summarized from your planner and log data.</p>
              <div className="home-hero-actions">
                <button
                  className="btn-primary"
                  type="button"
                  onClick={() => router.push('/proofit/planner')}
                >
                  Open Planner
                </button>
                <button className="btn-secondary" type="button" onClick={() => router.push('/proofit/stats')}>
                  View Stats
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => router.push('/proofit/nutrition')}
                >
                  Nutrition
                </button>
              </div>
            </div>
          </div>

          <div className="home-dashboard-grid">
            <div className="progress-card home-weekly-progress">
              <div className="progress-card-title">Weekly Goal Progress</div>
              <div className="circular-progress large" id="weeklyGoalProgress">
                <svg viewBox="0 0 160 160" preserveAspectRatio="xMidYMid meet">
                  <circle className="circular-progress-circle-bg" cx="80" cy="80" r="72"></circle>
                  <circle
                    className={`circular-progress-circle ${
                      stats.weeklyProgress >= 80
                        ? 'success'
                        : stats.weeklyProgress >= 50
                          ? 'warning'
                          : stats.weeklyProgress < 30
                            ? 'danger'
                            : ''
                    }`}
                    cx="80"
                    cy="80"
                    r="72"
                    id="weeklyGoalCircle"
                    style={{ strokeDashoffset: offset }}
                  ></circle>
                </svg>
                <div className="circular-progress-content">
                  <div className="circular-progress-value" id="weeklyGoalValue">
                    {stats.weeklyProgress}%
                  </div>
                  <div className="circular-progress-label">Goal Achieved</div>
                </div>
              </div>
              <div className="progress-card-subtitle" id="weeklyGoalSubtitle">
                {(() => {
                  const weeklyGoal = getStorageItem('weekly_workout_goal')
                  if (weeklyGoal === '0' || !weeklyGoal) {
                    return 'Set your weekly workout goal'
                  }
                  if (stats.weeklyProgress >= 100) {
                    return `Goal achieved! ${stats.thisWeekWorkouts} workouts completed`
                  }
                  return `${stats.thisWeekWorkouts}/${weeklyGoal} workouts completed`
                })()}
              </div>
            </div>

            <div className="stats-grid home-stats-grid">
              <div className="stat-card">
                <div className="stat-label">This Week&apos;s Workouts</div>
                <div className="stat-value" id="statChatCount">
                  {stats.thisWeekWorkouts}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Scheduled</div>
                <div className="stat-value" id="statPlannerCount">
                  {stats.upcomingPlans}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Completed</div>
                <div className="stat-value" id="statCompletedCount">
                  {stats.completedWorkouts}
                </div>
              </div>
            </div>
          </div>

          <div className="home-today">
            <div className="home-today-header">
              <h3 className="home-today-title">Today&apos;s Checklist</h3>
              <div className="muted" id="todayDateLabel">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </div>
            </div>

            <div className="home-today-list">
              <div className="home-today-row">
                <div className="home-today-left">
                  <div className="home-today-label">Today&apos;s Schedule</div>
                  <div className="home-today-sub muted" id="todayPlannerSub">
                    {todayChecklist.planner}
                  </div>
                </div>
                <div className="home-today-right">
                  <button
                    id="btnTodayOpenPlanner"
                    className="btn-secondary"
                    type="button"
                    onClick={() => router.push('/proofit/planner')}
                  >
                    Planner
                  </button>
                </div>
              </div>

              <div className="home-today-row">
                <div className="home-today-left">
                  <div className="home-today-label">Workout Log</div>
                  <div className="home-today-sub muted" id="todayWorkoutLogSub">
                    {todayChecklist.workoutLog}
                  </div>
                </div>
                <div className="home-today-right">
                  <button
                    id="btnTodayOpenWorkoutLog"
                    className="btn-secondary"
                    type="button"
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0]
                      setStorageJSON('workout_log_prefill', { date: today })
                      router.push('/proofit/workout-log')
                    }}
                  >
                    Log
                  </button>
                </div>
              </div>

              <div className="home-today-row">
                <div className="home-today-left">
                  <div className="home-today-label">Calories</div>
                  <div className="home-today-sub muted" id="todayCaloriesSub">
                    {todayChecklist.calories}
                  </div>
                </div>
                <div className="home-today-right">
                  <button
                    id="btnTodayOpenNutrition"
                    className="btn-secondary"
                    type="button"
                    onClick={() => router.push('/proofit/nutrition')}
                  >
                    Nutrition
                  </button>
                </div>
              </div>

              <div className="home-today-row">
                <div className="home-today-left">
                  <div className="home-today-label">Weight Record</div>
                  <div className="home-today-sub muted" id="todayBodySub">
                    {todayChecklist.body}
                  </div>
                </div>
                <div className="home-today-right">
                  <button
                    id="btnTodayOpenBody"
                    className="btn-secondary"
                    type="button"
                    onClick={() => router.push('/proofit/body-tracker')}
                  >
                    Body
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
