const btn = document.querySelector(".btn");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x10C4, productId: 0xEA60 }] });
      console.log("Dispositivo conectado:", device);
      await device.open();
      // Seleccionar configuración e interfaz (ajusta según tu dispositivo)
      let configuration, interface, endpoint;
      for (configuration of device.configurations) {
          for (interface of configuration.interfaces) {
              for (endpoint of interface.endpoints) {
                  // Verificar si el endpoint es de entrada (ajusta según tus necesidades)
                  if (endpoint.direction === 'in') {
                      break;
                  }
              }
              if (endpoint) {
                  break;
              }
          }
          if (endpoint) {
              break;
          }
      }
      
      if (!endpoint) {
          throw new Error('No se encontró un endpoint de entrada válido');
      }
      // Crear una tubería
      const result = await endpoint.transferIn(64); // 64 bytes es un tamaño de transferencia común, ajusta según sea necesario
      console.log("Datos recibidos:", result.data);

      // Continuar leyendo datos
      await endpoint.transferIn(64);
  } catch (error) {
      if (error.name === 'SecurityError') {
          console.error('Permiso denegado por el usuario', error);
      } else {
          console.error('Error al abrir el dispositivo:', error);
      }
  }
});





// navigator.usb.requestDevice()
//   .then(devices => {
//     // Mostrar una lista de dispositivos al usuario
//     devices.forEach((device, index) => {
//       console.log(`${index + 1}. ${device.productName}`);
//     });

//     // Pedir al usuario que seleccione un dispositivo
//     const selectedIndex = prompt('Selecciona el número del dispositivo:');
//     const selectedDevice = devices[selectedIndex - 1];

//     // Usar el dispositivo seleccionado
//     selectedDevice.open()
//       .then(() => {
//         // ...
//       });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// btn.addEventListener("click", async(e) => {
//     e.preventDefault();	
//     await navigator.usb.requestDevice({ filters: [{ vendorId: 0x10C4, productId: 0xEA60 }] })
//   .then(device => {
//     console.log("Dispositivo conectado:", device);
//    device.open()
//       .then(() => {
//         // Seleccionar configuración e interfaz (ajusta según tu dispositivo)
//         const configuration = device.configurations[0];
//         const interface = configuration.interfaces[0];
//         const endpoint = interface.endpoints[0]; // Suponiendo que el primer endpoint es de entrada

//         // Crear una tubería
//         endpoint.transferIn(64) // 64 bytes es un tamaño de transferencia común, ajusta según sea necesario
//           .then(result => {
//             // Los datos leídos están en result.data
//             console.log("Datos recibidos:", result.data);

//             // Continuar leyendo datos
//             endpoint.transferIn(64).then(/* ... */);
//           });
//       }).catch(error => {
//         if (error.name === 'SecurityError') {
//           console.error('User denied permission', error);
//         } else {
//           console.error('Error opening device:', error);
//         }
//       });
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });
// })






// let configuration, interface, endpoint;
// for (configuration of device.configurations) {
//     for (interface of configuration.interfaces) {
//         for (endpoint of interface.endpoints) {
//             // Verificar si el endpoint es de entrada (ajusta según tus necesidades)
//             if (endpoint.direction === 'in') {
//                 break;
//             }
//         }
//         if (endpoint) {
//             break;
//         }
//     }
//     if (endpoint) {
//         break;
//     }
// }

// if (!endpoint) {
//     throw new Error('No se encontró un endpoint de entrada válido');
// }

// navigator.usb.requestDevice({ filters: [{  vendorId: 0x10C4, productId: 0xEA60 }] })
//   .then(device => {
//     // Aquí puedes trabajar con el dispositivo seleccionado por el usuario
//     console.log("Dispositivo conectado:", device);
//   })
//   .catch(error => {
//     console.log("Error al conectar el dispositivo:", error);
//   });