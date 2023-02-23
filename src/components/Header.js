import PropTypes  from 'prop-types'
import Button from './Button'

function Header({title, onAdd, showAdd}) {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'steelblue'} text={showAdd ? 'Close': 'Add Task'} onClick={onAdd}  />
    </header>
    )
}



Header.defaultProps ={
    title: 'ToDo List'
}

Header.propTypes = {
    title: PropTypes.string,
}
export default Header