import './index.css'

const TabItem = props => {
  const {tabsObj, isActive, ActivateTabFun} = props
  const {tabId, displayText} = tabsObj
  const activeClassName = isActive ? 'active-class' : ''

  const onActivatingTab = () => {
    ActivateTabFun(tabId)
  }

  return (
    <li className="tab-item">
      <button
        className={`tab-item-para ${activeClassName}`}
        type="button"
        onClick={onActivatingTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
