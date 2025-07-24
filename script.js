let puntos1 = 0;
let puntos2 = 0;
let game1 = 0;
let game2 = 0;
let set1 = 0;
let set2 = 0;

let deuceCount = 0;
let tieBreak = false;
let tie1 = 0;
let tie2 = 0;
let superTieBreak = false;
let superTie1 = 0;
let superTie2 = 0;

function cambiarPunto(num) {
  if (num === 0) return "0";
  if (num === 1) return "15";
  if (num === 2) return "30";
  if (num === 3) return "40";
  return "";
}

function sumarJugador1() {
  if (superTieBreak) {
    superTie1++;
    document.getElementById("puntaje1").innerText = superTie1;
    document.getElementById("puntaje2").innerText = superTie2;
    if (superTie1 >= 10 && superTie1 - superTie2 >= 2) {
      alert("🎉 Jugador 1 gana el partido (super tie-break)");
      reiniciarPartido();
    }
    return;
  }

  if (tieBreak) {
    tie1++;
    document.getElementById("puntaje1").innerText = tie1;
    document.getElementById("puntaje2").innerText = tie2;
    if (tie1 >= 7 && tie1 - tie2 >= 2) {
      set1++;
      document.getElementById("setJug1").innerText = set1;
      tieBreak = false;
      chequearPartido();
      reiniciarGames();
    }
    return;
  }

  puntos1++;

  if (puntos1 >= 4 && puntos1 - puntos2 >= 2) {
    game1++;
    document.getElementById("sumarGameJug1").innerText = game1;
    puntos1 = 0;
    puntos2 = 0;
    deuceCount = 0;
    actualizarPuntajes();
    verificarSet();
    return;
  }

  if (puntos1 >= 3 && puntos2 >= 3) {
    if (puntos1 === puntos2) {
      document.getElementById("estado").innerText = "Deuce";
      deuceCount++;
    } else if (puntos1 > puntos2) {
      if (deuceCount >= 2) {
        game1++;
        document.getElementById("sumarGameJug1").innerText = game1;
        puntos1 = 0;
        puntos2 = 0;
        deuceCount = 0;
        document.getElementById("estado").innerText = "";
        actualizarPuntajes();
        verificarSet();
        return;
      } else {
        document.getElementById("estado").innerText = "Ventaja Jugador 1";
      }
    }
  }

  actualizarPuntajes();
}

function sumarJugador2() {
  if (superTieBreak) {
    superTie2++;
    document.getElementById("puntaje1").innerText = superTie1;
    document.getElementById("puntaje2").innerText = superTie2;
    if (superTie2 >= 10 && superTie2 - superTie1 >= 2) {
      alert("🎉 Jugador 2 gana el partido (super tie-break)");
      reiniciarPartido();
    }
    return;
  }

  if (tieBreak) {
    tie2++;
    document.getElementById("puntaje1").innerText = tie1;
    document.getElementById("puntaje2").innerText = tie2;
    if (tie2 >= 7 && tie2 - tie1 >= 2) {
      set2++;
      document.getElementById("setJug2").innerText = set2;
      tieBreak = false;
      chequearPartido();
      reiniciarGames();
    }
    return;
  }

  puntos2++;

  if (puntos2 >= 4 && puntos2 - puntos1 >= 2) {
    game2++;
    document.getElementById("sumarGameJug2").innerText = game2;
    puntos1 = 0;
    puntos2 = 0;
    deuceCount = 0;
    actualizarPuntajes();
    verificarSet();
    return;
  }

  if (puntos1 >= 3 && puntos2 >= 3) {
    if (puntos1 === puntos2) {
      document.getElementById("estado").innerText = "Deuce";
      deuceCount++;
    } else if (puntos2 > puntos1) {
      if (deuceCount >= 2) {
        game2++;
        document.getElementById("sumarGameJug2").innerText = game2;
        puntos1 = 0;
        puntos2 = 0;
        deuceCount = 0;
        document.getElementById("estado").innerText = "";
        actualizarPuntajes();
        verificarSet();
        return;
      } else {
        document.getElementById("estado").innerText = "Ventaja Jugador 2";
      }
    }
  }

  actualizarPuntajes();
}

function restarJugador1() {
  if (puntos1 > 0) puntos1--;
  actualizarPuntajes();
}

function restarJugador2() {
  if (puntos2 > 0) puntos2--;
  actualizarPuntajes();
}

function actualizarPuntajes() {
  document.getElementById("puntaje1").innerText = cambiarPunto(puntos1);
  document.getElementById("puntaje2").innerText = cambiarPunto(puntos2);
}

function verificarSet() {
  if (tieBreak || superTieBreak) return;

  if (game1 == 6 && game2 <= 4) {
    set1++;
    document.getElementById("setJug1").innerText = set1;
    chequearPartido();
    reiniciarGames();
  } else if (game2 == 6 && game1 <= 4) {
    set2++;
    document.getElementById("setJug2").innerText = set2;
    chequearPartido();
    reiniciarGames();
  } else if (game1 == 7 && game2 <= 5) {
    set1++;
    document.getElementById("setJug1").innerText = set1;
    chequearPartido();
    reiniciarGames();
  } else if (game2 == 7 && game1 <= 5) {
    set2++;
    document.getElementById("setJug2").innerText = set2;
    chequearPartido();
    reiniciarGames();
  } else if (game1 == 6 && game2 == 6) {
    tieBreak = true;
    alert("🎾 Tie-break a 7 puntos");
  }
}

function chequearPartido() {
  if (set1 == 2) {
    alert("🎉 Jugador 1 gana el partido");
    reiniciarPartido();
  } else if (set2 == 2) {
    alert("🎉 Jugador 2 gana el partido");
    reiniciarPartido();
  } else if (set1 == 1 && set2 == 1) {
    superTieBreak = true;
    alert("🏆 Super tie-break a 10 puntos");
  }
}

function reiniciarGames() {
  game1 = 0;
  game2 = 0;
  puntos1 = 0;
  puntos2 = 0;
  tie1 = 0;
  tie2 = 0;
  deuceCount = 0;
  document.getElementById("sumarGameJug1").innerText = "0";
  document.getElementById("sumarGameJug2").innerText = "0";
  actualizarPuntajes();
  document.getElementById("estado").innerText = "";
}

function reiniciarPartido() {
  puntos1 = puntos2 = 0;
  game1 = game2 = 0;
  set1 = set2 = 0;
  tie1 = tie2 = 0;
  superTie1 = superTie2 = 0;
  tieBreak = false;
  superTieBreak = false;
  deuceCount = 0;

  document.getElementById("puntaje1").innerText = "0";
  document.getElementById("puntaje2").innerText = "0";
  document.getElementById("sumarGameJug1").innerText = "0";
  document.getElementById("sumarGameJug2").innerText = "0";
  document.getElementById("setJug1").innerText = "0";
  document.getElementById("setJug2").innerText = "0";
  document.getElementById("estado").innerText = "";
}
