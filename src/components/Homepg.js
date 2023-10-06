import Notes from './Notes';

function Homepg(props) {
  const { showAlert } = props
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Homepg