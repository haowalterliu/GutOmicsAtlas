import { NavLink } from 'react-router-dom'

const mainLinks = [
  { to: '/', label: 'Chat with AI' },
  { to: '/scrna', label: 'Single-cell modal' },
  { to: '/spatial', label: 'Spatial modal' },
]

const sideLinks = [
  { to: '/help', label: 'Help' },
  { to: '/about', label: 'About' },
]

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-[13px] no-underline ${
    isActive
      ? 'font-semibold text-[#de3341] bg-[#de3341]/5'
      : 'font-medium text-[#6B7280] hover:text-[#0f0f0f] hover:bg-[#F5F5F5]'
  }`

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-10 py-4">
        {/* Left: Logo */}
        <NavLink to="/" className="text-[18px] font-bold tracking-tight text-[#0f0f0f] no-underline shrink-0">
          GutOmicsAtlas
        </NavLink>

        {/* Right: All tabs with divider */}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mx-4 h-5 w-px bg-[#E5E7EB]" />

          <div className="flex items-center gap-1">
            {sideLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
