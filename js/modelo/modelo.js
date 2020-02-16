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
    this.preguntas.some(function(element, i){
      if(element.id == id){
        index = i;
      }
    });

    this.preguntas.splice(index, 1);
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function(){
    this.preguntas = [];
    this.borradoDeTodo.notificar();

  },

  //se guardan las preguntas
  guardar: function(){
  },
};
