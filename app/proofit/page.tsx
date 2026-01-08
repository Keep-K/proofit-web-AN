'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '@/Jass_project/styles/main.css'

// 원본 JavaScript 파일들을 동적으로 import
let appInitialized = false

export default function ProofitPage() {
  useEffect(() => {
    if (appInitialized) return

    // 원본 app.js 초기화
    const initApp = async () => {
      try {
        // 동적으로 원본 모듈들 import
        const { initRouter } = await import('@/Jass_project/components/navigation.js')
        const { initChatPage } = await import('@/Jass_project/pages/chat.js')
        const { initPlannerPage } = await import('@/Jass_project/pages/planner.js')
        const { initMypagePage } = await import('@/Jass_project/pages/mypage.js')
        const { connectWallet, signInWithWallet } = await import('@/Jass_project/utils/wallet.js')
        const { getAccessToken, removeAccessToken } = await import('@/Jass_project/config/api.js')
        const { initHomePage } = await import('@/Jass_project/pages/home.js')
        const { initWorkoutLogPage } = await import('@/Jass_project/pages/workout-log.js')
        const { initStatsPage } = await import('@/Jass_project/pages/stats.js')
        const { initBodyTrackerPage } = await import('@/Jass_project/pages/body-tracker.js')
        const { initNutritionPage } = await import('@/Jass_project/pages/nutrition.js')

        // 원본 app.js의 init 함수 로직
        const btnWallet = document.getElementById('btnWallet') as HTMLButtonElement | null
        const walletStatus = document.getElementById('walletStatus')

        if (btnWallet && walletStatus) {
          const showLoadingOverlay = () => {
            const overlay = document.getElementById('walletLoadingOverlay')
            if (overlay) {
              overlay.style.display = 'flex'
            }
          }

          const hideLoadingOverlay = () => {
            const overlay = document.getElementById('walletLoadingOverlay')
            if (overlay) {
              overlay.style.display = 'none'
            }
          }

          const updateWalletButton = () => {
            const isConnected = !!getAccessToken()

            if (isConnected) {
              btnWallet.innerHTML = 'Disconnect'
              btnWallet.classList.add('connected')
              btnWallet.disabled = false
            } else {
              btnWallet.innerHTML = 'Connect Wallet'
              btnWallet.classList.remove('connected')
              btnWallet.disabled = false
            }
          }

          const disconnectWallet = () => {
            showLoadingOverlay()
            removeAccessToken()
            updateWalletButton()
            if (walletStatus) {
              walletStatus.textContent = 'Not signed in'
            }
            window.dispatchEvent(new CustomEvent('walletDisconnected'))

            const currentPath = window.location.pathname
            if (currentPath !== '/proofit' && currentPath !== '/proofit/') {
              window.history.pushState({}, '', '/proofit')
              window.dispatchEvent(new PopStateEvent('popstate'))
            }

            setTimeout(() => {
              hideLoadingOverlay()
              window.location.reload()
            }, 500)
          }

          const connectWalletHandler = async () => {
            try {
              showLoadingOverlay()
              const address = await connectWallet()
              await signInWithWallet(address)
              updateWalletButton()

              if (walletStatus) {
                walletStatus.textContent = 'Connected'
              }

              await new Promise((resolve) => setTimeout(resolve, 100))
              window.dispatchEvent(new CustomEvent('walletConnected'))

              setTimeout(() => {
                hideLoadingOverlay()
                window.location.reload()
              }, 800)
            } catch (e: any) {
              hideLoadingOverlay()
              console.error(e)
              if (e?.code === -32002) {
                alert(
                  'MetaMask connection request is already pending.\nPlease click the MetaMask icon in the top right to approve/cancel.'
                )
              } else if (e?.code === 4001) {
                alert('User rejected the connection/signature request.')
              } else if (e?.message && e.message.includes('Solana')) {
                alert('Solana wallet is not supported.\nPlease use MetaMask.')
              } else {
                alert(`Error: ${e.message || String(e)}`)
              }
            }
          }

          btnWallet.addEventListener('click', async (e) => {
            e.stopPropagation()
            const isConnected = !!getAccessToken()

            if (isConnected) {
              disconnectWallet()
            } else {
              await connectWalletHandler()
            }
          })

          updateWalletButton()

          if (walletStatus) {
            if (getAccessToken()) {
              walletStatus.textContent = 'JWT loaded (localStorage)'
            } else {
              walletStatus.textContent = 'Not signed in'
            }
          }
        } else {
          console.warn('Wallet-related DOM elements not found.')
        }

        const pageInitializers = {
          home: initHomePage,
          chat: initChatPage,
          stats: initStatsPage,
          'body-tracker': initBodyTrackerPage,
          nutrition: initNutritionPage,
          'workout-log': initWorkoutLogPage,
          mypage: initMypagePage,
          planner: initPlannerPage,
        }

        let currentPage: any = null

        const router = initRouter((pageName: string) => {
          if (currentPage && currentPage.cleanup) {
            currentPage.cleanup()
          }

          const initializer = pageInitializers[pageName as keyof typeof pageInitializers]
          if (initializer) {
            currentPage = initializer()
          }
        })

        appInitialized = true
      } catch (error) {
        console.error('Error initializing app:', error)
      }
    }

    initApp()
  }, [])

  // 원본 HTML 구조를 JSX로 변환
  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <Link href="/" className="header-logo-link">
              <Image
                src="/images/handmade/Logo1.png"
                alt="PROOFIT"
                width={32}
                height={32}
                className="header-logo-image"
                priority
              />
              <h2>Proofit Demo</h2>
            </Link>
          </div>
          <div className="header-actions">
            <button id="btnWallet" className="wallet-button">
              Connect Wallet
            </button>
            <span id="walletStatus" className="wallet-status muted"></span>
          </div>
        </div>
      </header>

      <nav className="app-navigation">
        <div className="nav-buttons">
          <button id="btnHome" className="nav-btn active">
            Home
          </button>
          <button id="btnChat" className="nav-btn">
            Chat
          </button>
          <button id="btnStats" className="nav-btn">
            Stats
          </button>
          <button id="btnBodyTracker" className="nav-btn">
            Body
          </button>
          <button id="btnNutrition" className="nav-btn">
            Nutrition
          </button>
          <button id="btnMypage" className="nav-btn">
            Mypage
          </button>
          <button id="btnPlanner" className="nav-btn">
            Planner
          </button>
        </div>
      </nav>

      <div id="walletLoadingOverlay" className="loading-overlay" style={{ display: 'none' }}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">Connecting wallet...</p>
        </div>
      </div>

      <main className="app-main">
        {/* 원본 HTML의 모든 페이지를 그대로 포함 */}
        <div
          id="page-home"
          className="page active"
          dangerouslySetInnerHTML={{
            __html: `
          <div id="home-not-connected" class="home-hero home-hero--disconnected">
            <div class="home-hero-inner">
              <div class="home-hero-kicker">Proofit</div>
              <h1 class="home-hero-title">Plan, track, and grow your fitness journey.</h1>
              <p class="home-hero-subtitle">Connect your MetaMask wallet to use the service.</p>
              <div class="home-hero-actions">
                <button class="btn-primary" type="button" onclick="document.getElementById('btnWallet')?.click()">Connect Wallet</button>
                <button class="btn-secondary" type="button" onclick="document.getElementById('btnPlanner')?.click()">View Planner</button>
                <button class="btn-secondary" type="button" onclick="document.getElementById('btnChat')?.click()">AI Coach</button>
              </div>
            </div>
          </div>
          <div id="home-connected" class="home-dashboard" style="display: none;">
            <div class="home-hero home-hero--connected">
              <div class="home-hero-inner">
                <div class="home-hero-kicker">Dashboard</div>
                <h1 class="home-hero-title">Your weekly workout at a glance.</h1>
                <p class="home-hero-subtitle">Key metrics summarized from your planner and log data.</p>
                <div class="home-hero-actions">
                  <button class="btn-primary" type="button" onclick="document.getElementById('btnPlanner')?.click()">Open Planner</button>
                  <button class="btn-secondary" type="button" onclick="document.getElementById('btnStats')?.click()">View Stats</button>
                  <button class="btn-secondary" type="button" onclick="document.getElementById('btnNutrition')?.click()">Nutrition</button>
                </div>
              </div>
            </div>
            <div class="home-dashboard-grid">
              <div class="progress-card home-weekly-progress">
                <div class="progress-card-title">Weekly Goal Progress</div>
                <div class="circular-progress large" id="weeklyGoalProgress">
                  <svg viewBox="0 0 160 160" preserveAspectRatio="xMidYMid meet">
                    <circle class="circular-progress-circle-bg" cx="80" cy="80" r="72"></circle>
                    <circle class="circular-progress-circle" cx="80" cy="80" r="72" id="weeklyGoalCircle"></circle>
                  </svg>
                  <div class="circular-progress-content">
                    <div class="circular-progress-value" id="weeklyGoalValue">0%</div>
                    <div class="circular-progress-label">Goal Achieved</div>
                  </div>
                </div>
                <div class="progress-card-subtitle" id="weeklyGoalSubtitle">Set your weekly workout goal</div>
              </div>
              <div class="stats-grid home-stats-grid">
                <div class="stat-card">
                  <div class="stat-label">This Week's Workouts</div>
                  <div class="stat-value" id="statChatCount">0</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Scheduled</div>
                  <div class="stat-value" id="statPlannerCount">0</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Completed</div>
                  <div class="stat-value" id="statCompletedCount">0</div>
                </div>
              </div>
            </div>
            <div class="home-today">
              <div class="home-today-header">
                <h3 class="home-today-title">Today's Checklist</h3>
                <div class="muted" id="todayDateLabel"></div>
              </div>
              <div class="home-today-list">
                <div class="home-today-row">
                  <div class="home-today-left">
                    <div class="home-today-label">Today's Schedule</div>
                    <div class="home-today-sub muted" id="todayPlannerSub">0 items</div>
                  </div>
                  <div class="home-today-right">
                    <button id="btnTodayOpenPlanner" class="btn-secondary" type="button">Planner</button>
                  </div>
                </div>
                <div class="home-today-row">
                  <div class="home-today-left">
                    <div class="home-today-label">Workout Log</div>
                    <div class="home-today-sub muted" id="todayWorkoutLogSub">No records</div>
                  </div>
                  <div class="home-today-right">
                    <button id="btnTodayOpenWorkoutLog" class="btn-secondary" type="button">Log</button>
                  </div>
                </div>
                <div class="home-today-row">
                  <div class="home-today-left">
                    <div class="home-today-label">Calories</div>
                    <div class="home-today-sub muted" id="todayCaloriesSub">0 / 2000 kcal</div>
                  </div>
                  <div class="home-today-right">
                    <button id="btnTodayOpenNutrition" class="btn-secondary" type="button">Nutrition</button>
                  </div>
                </div>
                <div class="home-today-row">
                  <div class="home-today-left">
                    <div class="home-today-label">Weight Record</div>
                    <div class="home-today-sub muted" id="todayBodySub">Not recorded</div>
                  </div>
                  <div class="home-today-right">
                    <button id="btnTodayOpenBody" class="btn-secondary" type="button">Body</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          }}
        />

        <div id="page-chat" className="page">
          <div className="chat-container">
            <div id="chatMessages" className="chat-messages"></div>
            <div id="suggestions" className="suggestions"></div>
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  id="chatInput"
                  className="chat-input"
                  placeholder="Enter your message..."
                />
                <button id="btnSend" className="btn-primary" title="Send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="page-stats" className="page">
          <div id="statsContainer" className="page-content">
            <h2>Stats</h2>
            <div className="stats-grid" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <div className="progress-card">
                <div className="progress-card-title">Total Workouts</div>
                <div className="circular-progress medium" id="totalWorkoutsProgress">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <circle className="circular-progress-circle-bg" cx="50" cy="50" r="45"></circle>
                    <circle
                      className="circular-progress-circle success"
                      cx="50"
                      cy="50"
                      r="45"
                      id="totalWorkoutsCircle"
                    ></circle>
                  </svg>
                  <div className="circular-progress-content">
                    <div className="circular-progress-value" id="statTotalWorkouts">
                      0
                    </div>
                    <div className="circular-progress-label">times</div>
                  </div>
                </div>
              </div>
              <div className="progress-card">
                <div className="progress-card-title">Completion Rate</div>
                <div className="circular-progress medium" id="completionRateProgress">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <circle className="circular-progress-circle-bg" cx="50" cy="50" r="45"></circle>
                    <circle className="circular-progress-circle" cx="50" cy="50" r="45" id="completionRateCircle"></circle>
                  </svg>
                  <div className="circular-progress-content">
                    <div className="circular-progress-value" id="statCompletionRate">
                      0%
                    </div>
                    <div className="circular-progress-label">Complete</div>
                  </div>
                </div>
              </div>
              <div className="progress-card">
                <div className="progress-card-title">Monthly Workouts</div>
                <div className="circular-progress medium" id="monthlyWorkoutsProgress">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <circle className="circular-progress-circle-bg" cx="50" cy="50" r="45"></circle>
                    <circle className="circular-progress-circle" cx="50" cy="50" r="45" id="monthlyWorkoutsCircle"></circle>
                  </svg>
                  <div className="circular-progress-content">
                    <div className="circular-progress-value" id="statMonthlyWorkouts">
                      0
                    </div>
                    <div className="circular-progress-label">times</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="charts-section">
              <div className="charts-grid">
                <section className="chart-panel">
                  <div className="chart-header">
                    <h3>Weekly Workout Frequency</h3>
                    <span className="muted">By day</span>
                  </div>
                  <canvas id="weeklyChart"></canvas>
                </section>
                <section className="chart-panel">
                  <div className="chart-header">
                    <h3>Monthly Workout Frequency</h3>
                    <span className="muted">By week</span>
                  </div>
                  <canvas id="monthlyChart"></canvas>
                </section>
                <section className="chart-panel">
                  <div className="chart-header">
                    <h3>Planner Completion Status</h3>
                    <span className="muted">Done/Scheduled/Skipped</span>
                  </div>
                  <div className="pie-layout">
                    <canvas id="completionChart"></canvas>
                    <div id="completionLegend" className="chart-legend"></div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div id="page-body-tracker" className="page">
          <div id="bodyTrackerContainer" className="page-content">
            <h2>Body Tracker</h2>
            <form id="weightForm" className="form">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" id="weightInput" step="0.1" required />
              </div>
              <div className="form-group">
                <label>Body Fat (%)</label>
                <input type="number" id="bodyFatInput" step="0.1" />
              </div>
              <div className="form-group">
                <label>Muscle Mass (kg)</label>
                <input type="number" id="muscleInput" step="0.1" />
              </div>
              <button type="submit" className="btn-primary">
                Record
              </button>
            </form>
            <canvas id="weightChart" width="400" height="200"></canvas>
            <div id="weightList"></div>
            <div className="photo-section">
              <h3>Photo Upload</h3>
              <div className="file-upload-row">
                <input type="file" id="photoInput" className="file-input-hidden" accept="image/*" />
                <label htmlFor="photoInput" className="btn-upload file-upload-btn">
                  Upload
                </label>
                <span id="photoFileName" className="muted file-upload-filename">
                  No file selected
                </span>
              </div>
              <div id="photoGallery" className="photo-gallery"></div>
            </div>
          </div>
        </div>

        <div id="page-nutrition" className="page">
          <div id="nutritionContainer" className="page-content">
            <h2>Nutrition</h2>
            <div className="calorie-section">
              <div className="progress-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div className="progress-card-title">Today&apos;s Calories</div>
                <div className="circular-progress large" id="calorieCircularProgress">
                  <svg viewBox="0 0 160 160" preserveAspectRatio="xMidYMid meet">
                    <circle className="circular-progress-circle-bg" cx="80" cy="80" r="72"></circle>
                    <circle className="circular-progress-circle" cx="80" cy="80" r="72" id="calorieCircle"></circle>
                  </svg>
                  <div className="circular-progress-content">
                    <div className="circular-progress-value" id="calorieCircularValue">
                      0
                    </div>
                    <div className="circular-progress-label">kcal</div>
                  </div>
                </div>
                <div className="progress-info" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                  <div>
                    <div className="progress-info-label">Consumed</div>
                    <div className="progress-info-value" id="caloriesConsumed">
                      0
                    </div>
                  </div>
                  <div>
                    <div className="progress-info-label">Target</div>
                    <div className="progress-info-value" id="caloriesTarget">
                      2000
                    </div>
                  </div>
                  <div>
                    <div className="progress-info-label">Remaining</div>
                    <div className="progress-info-value" id="caloriesRemaining">
                      2000
                    </div>
                  </div>
                </div>
                <form id="calorieGoalForm" className="form" style={{ marginTop: 'var(--spacing-lg)', width: '100%' }}>
                  <div className="form-group">
                    <label>Daily Calorie Goal</label>
                    <div className="inline-form-row">
                      <input type="number" id="calorieGoalInput" required />
                      <button type="submit" className="btn-secondary">
                        Set Goal
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="macro-progress">
                <div className="macro-item">
                  <div className="macro-header">
                    <span className="macro-name">Protein</span>
                    <span className="macro-value" id="totalProtein">
                      0g
                    </span>
                  </div>
                  <div className="macro-progress-bar">
                    <div className="macro-progress-fill protein" id="proteinProgress" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="macro-item">
                  <div className="macro-header">
                    <span className="macro-name">Carbs</span>
                    <span className="macro-value" id="totalCarbs">
                      0g
                    </span>
                  </div>
                  <div className="macro-progress-bar">
                    <div className="macro-progress-fill carbs" id="carbsProgress" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="macro-item">
                  <div className="macro-header">
                    <span className="macro-name">Fat</span>
                    <span className="macro-value" id="totalFat">
                      0g
                    </span>
                  </div>
                  <div className="macro-progress-bar">
                    <div className="macro-progress-fill fat" id="fatProgress" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <form id="nutritionForm" className="form">
              <div className="form-group">
                <label>Food Name</label>
                <input type="text" id="foodName" required />
              </div>
              <div className="form-group">
                <label>Calories (kcal)</label>
                <input type="number" id="foodCalories" required />
              </div>
              <div className="form-group">
                <label>Protein (g)</label>
                <input type="number" id="foodProtein" step="0.1" />
              </div>
              <div className="form-group">
                <label>Carbs (g)</label>
                <input type="number" id="foodCarbs" step="0.1" />
              </div>
              <div className="form-group">
                <label>Fat (g)</label>
                <input type="number" id="foodFat" step="0.1" />
              </div>
              <button type="submit" className="btn-primary">
                Add
              </button>
            </form>
            <div id="nutritionList"></div>
          </div>
        </div>

        <div id="page-workout-log" className="page">
          <div className="page-content">
            <h2>Workout Log</h2>
            <button id="btnLoadWorkoutLogs" className="btn-secondary">
              Load
            </button>
            <form id="workoutLogForm" className="form">
              <div className="form-group">
                <label>Date</label>
                <input type="date" id="workoutLogDate" required />
              </div>
              <div className="form-group">
                <label>Exercise Name</label>
                <input type="text" id="exerciseName" required />
              </div>
              <div id="setsContainer">
                <div className="set-input">
                  <input type="number" className="set-weight" placeholder="Weight (kg)" />
                  <input type="number" className="set-reps" placeholder="Reps" required />
                </div>
              </div>
              <button
                type="button"
                className="btn-secondary"
                id="btnAddSet"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).addSet) {
                    ;(window as any).addSet()
                  }
                }}
              >
                Add Set
              </button>
              <button type="submit" className="btn-primary">
                Record
              </button>
            </form>
            <div id="workoutLogList"></div>
          </div>
        </div>

        <div id="page-mypage" className="page">
          <div className="page-content">
            <h2>My Page</h2>
            <button id="btnLoadProfile" className="btn-secondary">
              Load Profile
            </button>
            <button id="btnLoadSummary" className="btn-secondary">
              Load Summary
            </button>
            <div id="profileInfo"></div>
            <form id="profileForm" className="form">
              <div className="form-group">
                <label>Display Name</label>
                <input type="text" id="displayName" />
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <input type="text" id="timezone" defaultValue="Asia/Seoul" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea id="bio"></textarea>
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input type="number" id="heightCm" />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" id="weightKg" step="0.1" />
              </div>
              <button type="submit" className="btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>

        <div id="page-planner" className="page">
          <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <h2 style={{ margin: 0 }}>Planner</h2>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <button id="btnLoadPlanner" className="btn-secondary">
                  Load
                </button>
                <button id="btnRefreshPlanner" className="btn-secondary">
                  Refresh
                </button>
              </div>
            </div>
            <div className="progress-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div className="progress-card-title">Schedule Completion Rate</div>
              <div className="circular-progress medium" id="plannerCompletionProgress">
                <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <circle className="circular-progress-circle-bg" cx="50" cy="50" r="45"></circle>
                  <circle className="circular-progress-circle" cx="50" cy="50" r="45" id="plannerCompletionCircle"></circle>
                </svg>
                <div className="circular-progress-content">
                  <div className="circular-progress-value" id="plannerCompletionValue">
                    0%
                  </div>
                  <div className="circular-progress-label">Complete</div>
                </div>
              </div>
              <div className="progress-card-subtitle" id="plannerCompletionSubtitle">
                No schedules
              </div>
            </div>
            <div className="calendar-section">
              <div className="calendar-header">
                <div className="calendar-nav">
                  <button id="btnPrevMonth" className="btn-secondary">
                    ◀
                  </button>
                  <div id="calendarMonthYear"></div>
                  <button id="btnNextMonth" className="btn-secondary">
                    ▶
                  </button>
                </div>
                <button id="btnToday" className="btn-secondary">
                  Today
                </button>
              </div>
              <div id="selectedDateHeader" className="selected-date-header"></div>
              <div id="calendar"></div>
              <div id="dateItemsList" className="date-items-list"></div>
            </div>
            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
              <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)' }}>Add New Schedule</h3>
              <form id="plannerForm" className="form">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" id="plannerTitle" required />
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  <input type="datetime-local" id="plannerStartAt" required />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input type="datetime-local" id="plannerEndAt" />
                </div>
                <button type="submit" className="btn-primary">
                  Add
                </button>
              </form>
            </div>
            <div id="plannerItems" style={{ marginTop: 'var(--spacing-lg)' }}></div>
          </div>
        </div>
      </main>
    </>
  )
}
