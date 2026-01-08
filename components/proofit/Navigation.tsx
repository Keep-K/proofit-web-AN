'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const navItems = [
  { id: 'home', label: 'Home', path: '/proofit' },
  { id: 'chat', label: 'Chat', path: '/proofit/chat' },
  { id: 'stats', label: 'Stats', path: '/proofit/stats' },
  { id: 'body-tracker', label: 'Body', path: '/proofit/body-tracker' },
  { id: 'nutrition', label: 'Nutrition', path: '/proofit/nutrition' },
  { id: 'mypage', label: 'Mypage', path: '/proofit/mypage' },
  { id: 'planner', label: 'Planner', path: '/proofit/planner' },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (path: string) => {
    router.push(path)
  }

  return (
    <nav className="app-navigation">
      <div className="nav-buttons">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path === '/proofit' && pathname === '/proofit')
          return (
            <button
              key={item.id}
              id={`btn${item.id.charAt(0).toUpperCase() + item.id.slice(1).replace('-', '')}`}
              className={`nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
