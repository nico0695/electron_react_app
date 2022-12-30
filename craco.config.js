/* 
Este archivo es para poder pisar la configuracion de webpack que utilizar
react-script (cra) con craco, para agregar el target electron-renderer.
sin esto no funciona la comunicacion IPC entre el main y el renderer
*/
const target = 'electron-renderer';

module.exports = {
  webpack: {
    configure: {
      target: target,
    },
  },
};
