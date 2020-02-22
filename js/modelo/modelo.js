/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.borradoDeTodo = new Evento(this);
  this.editadoPregunta = new Evento(this);
  this.agregadoDeVoto = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var finalId = 0;
    this.preguntas.forEach(function(pregunta){
      if(pregunta.id > finalId){
        finalId = pregunta.id;
      }
    });
    return finalId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    var index;
    this.preguntas.some((element, i) => {element.id == id ? index = i : 0})
    this.preguntas.splice(index, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.borradoDeTodo.notificar();

  },

  editarPregunta: function(id){
    var modificacionPregunta = prompt("Editar pregunta:");
    var index;
    this.preguntas.some((element, i) => {element.id == id ? index = i : 0})
    if(modificacionPregunta != ""){ this.preguntas[index].textoPregunta = modificacionPregunta};
    this.guardar();
    this.editadoPregunta.notificar();
  },

  agregarVoto: function(nombrePregunta, respuestaSeleccionada){
    var pregunta;
   this.preguntas.forEach((element) =>{
     if(element.textoPregunta == nombrePregunta){
        pregunta = element.cantidadPorRespuesta; 
     }});
    
    pregunta.forEach((element) =>{
      if(element.textoRespuesta == respuestaSeleccionada){
        element.cantidad++;
      }})
    this.agregadoDeVoto.notificar();
    this.guardar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  cargarPreguntas: function(){
    var stringPreguntas = localStorage.getItem("preguntas");
    if(stringPreguntas !== null) {
      this.preguntas = JSON.parse(stringPreguntas);
    }
  },
};
