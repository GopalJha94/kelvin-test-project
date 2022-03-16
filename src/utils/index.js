import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

//displayErrorMessage with toastr
const displayErrorMessage = (message) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>{ message }</p>)
    })
  }

  export { displayErrorMessage }