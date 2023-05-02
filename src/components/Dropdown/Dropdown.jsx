import { useState, useEffect, useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import './Dropdown.css'

const DROPDOWN_DATA = [
  {
    label: 'Newest first',
    value: 'newest'
  },
  {
    label: 'Oldest first',
    value: 'oldest'
  },
]

export const Dropdown = ({ value, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleOnItemClick = (index) => {
    onChange(DROPDOWN_DATA[index].value)
    setIsDropdownOpen(false)
  }

  const selectedOption = DROPDOWN_DATA.find(option => option.value === value)

  return (
    <div ref={dropdownRef} className={isDropdownOpen ? 'dropdown open' : 'dropdown'}>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onBlur={() => setIsDropdownOpen(false)}
        className="dropdown__heading"
      >
        <div className="dropdown__title">{selectedOption.label}</div>
        <FaChevronDown className='dropdown__icon' />
      </div>
      <ul className={isDropdownOpen ? 'dropdown__content show' : 'dropdown__content'}>
        {DROPDOWN_DATA.map((option, index) => {
          return <li
            key={index}
            className="dropdown__item"
            onClick={() => handleOnItemClick(index)}
            value={option.value}>
            {option.label}
          </li>
        })}
      </ul>
    </div>
  )
}