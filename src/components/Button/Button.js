
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const saveValues = ()=> {
    saveValues(values)
  }
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (e) => {
    e.preventDefault();

    const {name, value} = e.target
    setValues({...values, [name]: value})
  }
  
  const addItem = () => {
    const {condutividadeEntrada,condutividadePermeado, pH, temperaturaEntrada, vazaoEntrada, vazaoPermeado, pressaoEntrada, pressaoPermeado} = values
    
    // if(!condutividadeEntrada || !condutividadePermeado || !pH || !temperaturaEntrada
    //    || !vazaoEntrada || !vazaoPermeado || !pressaoEntrada || ! pressaoPermeado) return

    saveValues(values);
    setOpen(false);
  }
  
  const [values, setValues] = useState({condutividadeEntrada: '', condutividadePermeado: '', pH: '', temperaturaEntrada: '',
   vazaoEntrada: '', vazaoPermeado: '', pressaoEntrada: '', pressaoPermeado: ''});
console.log(setValues)

  
  
  return (
    <div>
      <button onClick={handleClickOpen}>
        Startup
      </button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Valores de Startup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite os valores das variaveis após a estabilização  da Osmose Reversa.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
          <TextField
           autoFocus
           required
           margin="dense"
           id="condutividadeEntrada"
           value={values.condutividadeEntrada}
           onChange={handleInputChange}
           label="Condutividade de Entrada"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="condituvidadePermeado"
           values={values.condutividadePermeado}
           onChange={handleInputChange}
           label="Condutividade do Permeado"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="pH"
           values={values.pH}
           onChange={handleInputChange}
           label="pH"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="temperaturaEntrada"
           values={values.temperaturaEntrada}
           onChange={handleInputChange}
           label="Temperatura de Entrada"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="vazaoEntrada"
           values={values.vazaoEntrada}
           onChange={handleInputChange}
           label="Vazão de Entrada"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="vazaoPermeado"
           values={values.vazaoPermeado}
           onChange={handleInputChange}
           label="Vazão de Permeado"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="pressaoEntrada"
           values={values.pressaoEntrada}
           onChange={handleInputChange}
           label="Pressão de Entrada"
           type="text"
           fullWidth
          />
          <TextField
           autoFocus
           required
           margin="dense"
           id="pressaoPermeado"
           values={values.pressaoPermeado}
           onChange={handleInputChange}
           label="Pressão do Permeado"
           type="text"
           fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={addItem} onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// const AddItemPopup = ({
//     open, 
//     closePopup,
//     saveItem,
// }) => {

//     const handleInputChange = e => {
//         const {name, value} = e.target
//         setValues({...values, [name]: value})
//     }

//     const addItem = () => {
//         const {name, quantity, unitCost} = values

//         if(!name || !quantity || !unitCost) return

//         saveItem(values)
//     }
//         // Declare our state variable called values
//         // Initialize with our default values

//     const [values, setValues] = useState({name: '', quantity: 0, unitCost: 0})
//     return(
//       <div>
//         <button onClick={open}>Startup</button>
//         <Dialog 
//         open={open}
//         onClose={closePopup}>
//         <DialogTitle>Add new item</DialogTitle>
//             <DialogContent>
//                 <TextField 
//                     name='name'
//                     label='Item name/Description'
//                     onChange={handleInputChange}
//                     value={values.name}/>
//                 <TextField 
//                     name='quantity'
//                     label='Quantity'
//                     onChange={handleInputChange}
//                     value={values.quantity}/>
//                 <TextField 
//                     name='unitCost'
//                     label='Unit Cost'
//                     onChange={handleInputChange}
//                     value={values.unitCost}/>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={closePopup} color="secondary" variant="contained">
//                     Cancel
//                 </Button>
//                 <Button onClick={addItem} color="primary" variant="contained">
//                         Save
//                 </Button>
//             </DialogActions>
//         </Dialog>
//         </div>
//     )
// }

// export default AddItemPopup