/* TO DO - list

  velocidad de respuesta, acierto o fallo,
    Si acierto pregunta en menos de 2seg - sumo 2 ptos
      (0ptos, pregunta correcta, 1seg) -> 2 ptos
      (1pto, crrecta, 1seg) -> 3ptos
    Si fallo pregunta en más de 10seg - resto 2 ptos
    Si acierto pregunta entre 2 y 10seg - sumo 1 pto
      (1pto, correcta, 5seg) -> 2ptos
    Si acierto y tardo mas de 10seg - 0 ptos
    Si fallo antes de 10seg - resto 1 pto 
    No se puede pasar sin responder
    Si en 20seg no has respondido, pasa a siguiente pregunta y pierdes 2ptos

ESCENARIO
  - Cual es la capital de Portugal
    a. Faro
    b. Oporto
    c. Lisboa
  El usuario dice Lisboa -> es correcta

  - Cual es la capital de Portugal
    a. Faro
    b. Oporto
    c. Lisboa
  El usuario dice Faro -> es incorrecta

  - Cual es la capital de Portugal
    a. Faro
    b. Oporto
    c. Lisboa
  El usuario dice Madrid -> es incorrecta


*/

describe('comprobador de respuestas', function(){
  function esCorrecto(pregunta, respuestaUsuario){
    if (pregunta.idBloqueContenido !== respuestaUsuario.idPregunta) {
      return false
    }
    if (respuestaUsuario.idRespuesta !== pregunta.respuestaCorrecta.id) {
      return false
    }
    return true;
  } 
  it('reconoce una pregunta correcta', function(){
    expect(esCorrecto({
      idBloqueContenido:1, 
      pregunta:'¿Cual es la capital de Portugal?',
      respuesta: [
                {id: 1, value:'Faro'},
                {id: 2, value:'Oporto'},
                {id: 3, value:'Lisboa'}
              ],
              respuestaCorrecta: {id: 3}
            },
            {idPregunta: 1 ,idRespuesta: 3})
          ).toBeTruthy();
  });
  it('reconoce una pregunta falsa', function(){
    expect(esCorrecto({
      idBloqueContenido:1, 
      pregunta:'¿Cual es la capital de Portugal?',
      respuesta: [
                {id: 1, value:'Faro'},
                {id: 2, value:'Oporto'},
                {id: 3, value:'Lisboa'}
              ],
              respuestaCorrecta: {id: 3}
            },
            {idPregunta: 1 ,idRespuesta: 2})
          ).toBeFalsy();
  });
  it('reconoce una pregunta falsa', function(){
    expect(esCorrecto({
      idBloqueContenido:1, 
      pregunta:'¿Cual es la capital de Portugal?',
      respuesta: [
                {id: 1, value:'Faro'},
                {id: 2, value:'Oporto'},
                {id: 3, value:'Lisboa'}
              ],
              respuestaCorrecta: {id: 3}
            },
            {idPregunta: 1 ,idRespuesta: 1})
          ).toBeFalsy();
  });
});


describe ('calculo de marcador', function(){

  function recalcularAcertandoPregunta(puntos, tiempo){
    if (tiempo <=2) {
      return puntos + 2;
    }
    if (tiempo > 2 && tiempo <= 10) {
      return puntos + 1;
    }
    if (tiempo > 10) {
      return puntos;
    }
  }
  function recalcularFallandoPregunta(puntos, tiempo){
    if (tiempo > 10) {
      return puntos - 2;
    }
    if (tiempo < 10) {
      return puntos - 1;
    }
  }
  function recalcularSinRespuesta (puntos) {
      return puntos -3;
  }

  it ("suma los puntos si acierta", function(){
    expect (recalcularAcertandoPregunta(0, 1)).toBe(2);
    expect (recalcularAcertandoPregunta(0, 5)).toBe(1);
    expect (recalcularAcertandoPregunta(0, 11)).toBe(0);
  });
  it ("resta los puntos si falla", function(){
    expect (recalcularFallandoPregunta(0, 11)).toBe(-2);
    expect (recalcularFallandoPregunta(0, 8)).toBe(-1);
  });
  it ("resta puntos si no contestas", function(){
    expect (recalcularSinRespuesta(5)).toBe(2);

  });

});








// const preguntas = [{
//   pregunta: "Who is the strongest?",
//   respuesta: {
//     a: "Superman",
//     b: "The Terminator",
//     c: "Waluigi, obviously"
//   },
//   respuestaCorrecta: "c"
// },
// {
//   pregunta: "What is the best site ever created?",
//   respuesta: {
//     a: "SitePoint",
//     b: "Simple Steps Code",
//     c: "Trick question; they're both the best"
//   },
//   respuestaCorrecta: "c"
// },
// {
//   pregunta: "Where is Waldo really?",
//   respuesta: {
//     a: "Antarctica",
//     b: "Exploring the Pacific Ocean",
//     c: "Sitting in a tree",
//     d: "Minding his own business, so stop asking"
//   },
//   respuestaCorrecta: "d"
// },
// ];

// function siguientePregunta (){
//     for (var i = 0; i <= preguntas.length; i++) {
//       console.log (preguntas[0].pregunta);
//       console.log (preguntas[0].respuesta)
//       // wait();
//       // function waits
//     }
// }
// siguientePregunta();


  // function recalcularMarcador(puntos, esCorrecta, tiempo, respondido) {
  //     if (respondido && esCorrecta && tiempo <=2) {
  //       return puntos + 2;
  //     }
  //     else if (respondido && esCorrecta && (tiempo > 2 && tiempo < 10)) {
  //       return puntos + 1;
  //     }
  //     else if (respondido && esCorrecta && tiempo > 10) {
  //       return puntos;
  //     }
  //     else if (respondido && esCorrecta == false  && tiempo > 10) {
  //       return puntos - 2;
  //     }
  //     else if (respondido && esCorrecta == false  && tiempo < 10) {
  //       return puntos - 1;
  //     }
  //     else if (!respondido && tiempo > 20) {
  //       return puntos -3 
  //     }
  // }
  // it ("suma los puntos si acierta muy rápido", function(){
  //   expect (recalcularMarcador(0, true, 1, true)).toBe(2);
  //   expect (recalcularMarcador(0, true, 5, true)).toBe(1);
  //   expect (recalcularMarcador(0, true, 11, true)).toBe(0);
  // });
  // it ("resta los puntos si falla muy lento", function(){
  //   expect (recalcularMarcador(0, false, 11, true)).toBe(-2);
  //   expect (recalcularMarcador(0, false, 8, true)).toBe(-1);
  // });
  // it ("resta punstos si no contestas en un determinado tiempo", function(){
  //   expect (recalcularMarcador(5, false, 21, false)).toBe(2);

  // });


