var horde = {};
horde.canvasFallbackContent = '<div class="fallback"><p>Your browser does not appear to support <a href="http://en.wikipedia.org/wiki/HTML5">HTML5</a>.</p><p>Please try one of the following, more standards compliant browsers: <a href="http://www.google.com/chrome">Chrome</a>, <a href="http://www.apple.com/safari/">Safari</a>, <a href="http://www.mozilla.com/firefox/">Firefox</a> or <a href="http://www.opera.com/">Opera</a>.</p></div>';
var bind = function(e, t) {
  return "string" == typeof t && (t = e[t]),
    function() {
      t.apply(e, arguments)
    }
};
if ("undefined" == typeof requestAnimationFrame) var requestAnimationFrame = window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
  setTimeout(function() {
    e(Date.now())
  }, 17)
};
horde.setInterval = function(e, t, i) {
    var s = function() {
      t.call(i)
    };
    return window.setInterval(s, e)
  }, horde.setTimeout = function(e, t, i) {
    var s = function() {
      t.call(i)
    };
    return window.setTimeout(s, e)
  }, horde.on = function(e, t, i, s) {
    i.addEventListener(e, function(e) {
      t.call(s, e)
    }, !1)
  }, horde.stopEvent = function(e) {
    e.cancelBubble = !0, e.stopPropagation(), e.preventDefault()
  }, horde.now = function() {
    return Date.now()
  }, horde.makeCanvas = function(e, t, i, s) {
    var a = document.createElement("canvas");
    if (a.id = e, a.width = Number(t) || 0, a.height = Number(i) || 0, s !== !0) {
      a.innerHTML = horde.canvasFallbackContent;
      var o = document.getElementById("stage");
      o.appendChild(a)
    }
    return a
  }, horde.getOffset = function(e) {
    for (var t = {
        x: e.offsetLeft,
        y: e.offsetTop
      };;) {
      if (e = e.parentNode, e === document.body) break;
      t.x += e.offsetLeft, t.y += e.offsetTop
    }
    return scrollTop = horde.getScrollTop(), t.x -= scrollTop.x, t.y -= scrollTop.y, t
  }, horde.getScrollTop = function() {
    if ("undefined" != typeof pageYOffset) return {
      x: pageXOffset,
      y: pageYOffset
    };
    var e = document.body,
      t = document.documentElement;
    return t = t.clientHeight ? t : e, {
      x: t.scrollLeft,
      y: t.scrollTop
    }
  }, horde.randomRange = function(e, t) {
    return Math.round(Math.random() * (t - e)) + e
  }, horde.clamp = function(e, t, i) {
    return Math.min(Math.max(e, t), i)
  }, horde.randomDirection = function() {
    var e = new horde.Vector2(horde.randomRange(-10, 10), horde.randomRange(-10, 10));
    return e.normalize(), e
  }, horde.makeObject = function(e, t) {
    var i = new horde.Object;
    i.type = e;
    for (var s in horde.objectTypes[e]) i[s] = horde.objectTypes[e][s];
    return t !== !0 && i.init(), i
  }, horde.directions = {
    UP: 0,
    UP_RIGHT: 1,
    RIGHT: 2,
    DOWN_RIGHT: 3,
    DOWN: 4,
    DOWN_LEFT: 5,
    LEFT: 6,
    UP_LEFT: 7,
    toVector: function(e) {
      switch (0 > e && (e += 8), e > 7 && (e -= 8), e) {
        case horde.directions.UP:
          // var event = {
          //   "game":"RenzoGame's",
          //   "event": "Movimiento",
          //   "value":"Arriba"
          // };
          // window.socket.send(JSON.stringify(event));
          return new horde.Vector2(0, -1);
        case horde.directions.UP_RIGHT:
          return new horde.Vector2(1, -1);
        case horde.directions.RIGHT:
          // var event = {
          //   "game":"RenzoGame's",
          //   "event": "Movimiento",
          //   "value":"Derecha"
          // };
          // window.socket.send(JSON.stringify(event));
          return new horde.Vector2(1, 0);
        case horde.directions.DOWN_RIGHT:
          return new horde.Vector2(1, 1);
        case horde.directions.DOWN:
          // var event = {
          //   "game":"RenzoGame's",
          //   "event": "Movimiento",
          //   "value":"Abajo"
          // };
          // window.socket.send(JSON.stringify(event));
          return new horde.Vector2(0, 1);
        case horde.directions.DOWN_LEFT:
          return new horde.Vector2(-1, 1);
        case horde.directions.LEFT:
          // var event = {
          //   "game":"RenzoGame's",
          //   "event": "Movimiento",
          //   "value":"Izquierda"
          // };
          // window.socket.send(JSON.stringify(event));
          return new horde.Vector2(-1, 0);
        case horde.directions.UP_LEFT:
          return new horde.Vector2(-1, -1)
      }
    },
    fromVector: function(e) {
      return e.x > -.25 && e.x < .25 && e.y < 0 ? horde.directions.UP : e.x > -.25 && e.x < .25 && e.y > 0 ? horde.directions.DOWN : e.x > 0 && e.y > -.25 && e.y < .25 ? horde.directions.RIGHT : e.x < 0 && e.y > -.25 && e.y < .25 ? horde.directions.LEFT : e.x > 0 && e.y < 0 ? horde.directions.UP_RIGHT : e.x > 0 && e.y > 0 ? horde.directions.DOWN_RIGHT : e.x < 0 && e.y > 0 ? horde.directions.DOWN_LEFT : e.x < 0 && e.y < 0 ? horde.directions.UP_LEFT : void 0
    }
  }, horde.x = function(e, t) {
    for (var i = 0, s = "", a = 0; a < t.length; ++a) i += t.charCodeAt(a);
    for (var o = 0; o < e.length; ++o) s += String.fromCharCode(i ^ e.charCodeAt(o));
    return s
  },
  function() {
    var e = [];
    horde.log = function(t) {
      e.push(t), console.log(t)
    }
  }(),
  function() {
    horde.Timer = function() {
      this.elapsed_ms = 0, this.ttl = 0
    };
    var e = horde.Timer,
      t = e.prototype;
    e.now = function() {
      return Date.now()
    }, t.start = function(e) {
      e && (this.ttl = Number(e)), this.elapsed_ms = 0
    }, t.update = function(e) {
      this.elapsed_ms += e
    }, t.reset = function() {
      this.start()
    }, t.elapsed = function() {
      return this.elapsed_ms
    }, t.expired = function() {
      return this.ttl > 0 ? this.elapsed_ms > this.ttl : !1
    }
  }(),
  function() {
    horde.sound = {};
    var e = "html5",
      t = ".mp3",
      i = !1,
      s = {},
      a = !1;
    horde.sound.init = function(t) {
      if ("undefined" == typeof Audio) return void(a = !0);
      switch (a = !1, e) {
        case "ios":
          t();
          break;
        case "sm2":
          soundManager.useFastPolling = !0, soundManager.useHighPerformance = !0, soundManager.autoLoad = !0, soundManager.multiShot = !0, soundManager.volume = 100, soundManager.onload = t, soundManager.useHTML5Audio = !1, soundManager.onerror = function(i) {
            return function() {
              e = "html5", i(t)
            }
          }(arguments.callee);
          break;
        case "html5":
          var i = document.createElement("audio");
          i.canPlayType && (i.canPlayType("audio/mpeg;") || (e = null)), t()
      }
    }, horde.sound.create = function(i, o, n, r) {
      if (!a) switch (n = Boolean(n), o += t, void 0 === r && (r = 100), e) {
        case "sm2":
          var h = {
            id: i,
            url: o,
            volume: r
          };
          n && (h.onfinish = function() {
            this.play()
          });
          var d = soundManager.createSound(h);
          d.load();
          break;
        case "html5":
          var p = new Audio;
          p.preload = "auto", p.src = o, n ? p.addEventListener("ended", function() {
            this.currentTime = 0, this.play()
          }, !1) : p.addEventListener("ended", function() {
            this.pause(), this.currentTime = 0
          }, !1), p.load(), p.volume = r / 100, s[i] = p
      }
    }, horde.sound.isPlaying = function(t) {
      if (!a) switch (e) {
        case "sm2":
          var i = soundManager.getSoundById(t);
          return i ? 1 === i.playState : !1;
        case "html5":
          return s[t].currentTime > 0
      }
    }, horde.sound.play = function(t) {
      if (!a) {
        if (i) return !1;
        switch (e) {
          case "ios":
            location.href = "jsbridge://" + t;
            break;
          case "sm2":
            soundManager.play(t);
            break;
          case "html5":
            try {
              s[t].pause(), s[t].currentTime = 0, s[t].play()
            } catch (o) {}
        }
      }
    }, horde.sound.stop = function(t) {
      if (!a) switch (e) {
        case "ios":
          break;
        case "sm2":
          soundManager.stop(t);
          break;
        case "html5":
          s[t].pause(), s[t].currentTime = 0
      }
    }, horde.sound.stopAll = function() {
      if (!a) switch (e) {
        case "ios":
          break;
        case "sm2":
          soundManager.stopAll();
          break;
        case "html5":
          try {
            for (var t in s) s[t].pause(), s[t].currentTime = 0
          } catch (i) {
            console.log("[ERROR horde.sound.stopAll]", i)
          }
      }
    }, horde.sound.pauseAll = function() {
      if (!a) switch (e) {
        case "sm2":
          soundManager.pauseAll();
          break;
        case "html5":
          for (var t in s) s[t].currentTime > 0 && s[t].pause()
      }
    }, horde.sound.resumeAll = function() {
      if (!a) switch (e) {
        case "sm2":
          soundManager.resumeAll();
          break;
        case "html5":
          for (var t in s) s[t].currentTime > 0 && s[t].play()
      }
    }, horde.sound.toggleMuted = function() {
      horde.sound.setMuted(!horde.sound.isMuted())
    }, horde.sound.isMuted = function() {
      return i
    }, horde.sound.setMuted = function(e) {
      i !== e && (i = e, i ? horde.sound.pauseAll() : horde.sound.resumeAll())
    }
  }(),
  function() {
    horde.Size = function(e, t) {
      this.width = Number(e) || 0, this.height = Number(t) || 0
    }
  }(),
  function() {
    horde.Vector2 = function(e, t) {
      this.x = Number(e) || 0, this.y = Number(t) || 0
    };
    var e = horde.Vector2,
      t = e.prototype;
    e.fromSize = function(e) {
      return new horde.Vector2(e.width, e.height)
    }, e.fromHeading = function(e, t) {
      return t = Number(t) || 1, new horde.Vector2(Math.sin(e) * t, -Math.cos(e) * t)
    }, t.clone = function() {
      return new horde.Vector2(this.x, this.y)
    }, t.scale = function(e) {
      return this.x *= e, this.y *= e, this
    }, t.add = function(e) {
      return this.x += e.x, this.y += e.y, this
    }, t.subtract = function(e) {
      return this.x -= e.x, this.y -= e.y, this
    }, t.zero = function() {
      return this.x = 0, this.y = 0, this
    }, t.invert = function() {
      return this.x *= -1, this.y *= -1, this
    }, t.magnitude = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }, t.normalize = function() {
      var e = this.magnitude();
      return 0 === e ? this : this.scale(1 / e)
    }, t.toString = function() {
      return this.x + ", " + this.y
    }, t.floor = function() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }, t.abs = function() {
      return this.x = Math.abs(this.x), this.y = Math.abs(this.y), this
    }, t.angle = function() {
      return this.heading() * (180 / Math.PI)
    }, t.heading = function() {
      return Math.atan2(this.x, -this.y)
    }
  }(),
  function() {
    horde.Rect = function(e, t, i, s) {
      this.left = Number(e) || 0, this.top = Number(t) || 0, this.width = Number(i) || 0, this.height = Number(s) || 0
    };
    var e = horde.Rect,
      t = e.prototype;
    e.intersects = function(e, t) {
      return e.left <= t.left + t.width && t.left <= e.left + e.width && e.top <= t.top + t.height && t.top <= e.top + e.height
    }, t.center = function() {
      var e = new horde.Vector2(this.width, this.height);
      return new horde.Vector2(this.left, this.top).add(e.scale(.5))
    }, t.intersects = function(t) {
      return e.intersects(this, t)
    }, t.reduce = function(e) {
      return this.left += e, this.top += e, this.width -= 2 * e, this.height -= 2 * e, this
    }
  }(),
  function() {
    horde.Keyboard = function() {
      this.history = [], this.keyStates = {}, this.lastKeyStates = {}, horde.on("keydown", this.handleKeyDown, window, this), horde.on("keyup", this.handleKeyUp, window, this)
    };
    var e = horde.Keyboard,
      t = e.prototype,
      i = {
        ESCAPE: 27,
        ENTER: 13,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        A: 65,
        B: 66,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        K: 75,
        L: 76,
        M: 77,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        W: 87,
        X: 88,
        Z: 90
      };
    e.Keys = i, e.konamiCode = [i.UP, i.UP, i.DOWN, i.DOWN, i.LEFT, i.RIGHT, i.LEFT, i.RIGHT, i.B, i.A], e.debugCode = [i.L, i.D, i.D, i.E, i.B, i.U, i.G], e.resetCode = [i.L, i.D, i.R, i.E, i.S, i.E, i.T], e.godModeCode = [i.L, i.D, i.D, i.Q, i.D], e.allWeaponsCode = [i.L, i.D, i.K, i.F, i.A], e.awesmCode = [i.A, i.W, i.E, i.S, i.M], e.bombCode = [i.L, i.D, i.B, i.O, i.M, i.B], e.cyclopsCode = [67, 89, 67, i.L, i.O, i.P, i.S], e.html5Code = [72, 84, 77, 76, 53], e.meatboyCode = [i.M, i.E, i.A, i.T], t.supressKeys = function(e) {
      switch (e.keyCode) {
        case i.ENTER:
        case i.LEFT:
        case i.UP:
        case i.RIGHT:
        case i.DOWN:
        case i.B:
        case i.A:
        case i.M:
        case i.Z:
        case i.X:
        case i.P:
        case i.SPACE:
        case i.W:
        case i.S:
        case i.D:
        case 191:
          horde.stopEvent(e)
      }
    }, t.handleKeyDown = function(e) {
      this.history.push(e.keyCode), this.keyStates[e.keyCode] = !0, this.supressKeys(e)
    }, t.handleKeyUp = function(e) {
      this.keyStates[e.keyCode] = !1, this.supressKeys(e)
    }, t.isKeyDown = function(e) {
      return this.keyStates[e] === !0
    }, t.isKeyPressed = function(e) {
      return this.isKeyDown(e) && this.lastKeyStates[e] !== !0
    }, t.isAnyKeyPressed = function(e) {
      for (var e in this.keyStates)
        if (this.isKeyDown(e) && this.lastKeyStates[e] !== !0) return !0;
      return !1
    }, t.clearKey = function(e) {
      this.keyStates[e] = !1
    }, t.clearKeys = function() {
      this.keyStates = {}
    }, t.clearHistory = function() {
      this.history = []
    }, t.historyMatch = function(e) {
      var t = e.length,
        i = this.history.slice(-t);
      if (i.length !== t) return !1;
      for (var s = 0; t > s; s++)
        if (e[s] !== i[s]) return !1;
      return !0
    }, t.storeKeyStates = function() {
      for (var e in this.keyStates) this.lastKeyStates[e] = this.keyStates[e]
    }
  }(),
  function() {
    horde.Mouse = function(e) {
      this.buttonStates = {}, this.mouseX = 0, this.mouseY = 0, this.canvas = e, this.lastButtonStates = {}, horde.on("mousemove", this.handleMouseMove, e, this), horde.on("mousedown", this.handleMouseDown, e, this), horde.on("mouseup", this.handleMouseUp, window, this)
    };
    var e = horde.Mouse,
      t = e.prototype;
    e.Buttons = {
      LEFT: 0,
      RIGHT: 2
    }, t.handleMouseMove = function(e) {
      var t = horde.getOffset(this.canvas);
      this.mouseX = 640 * (e.clientX - t.x) / this.canvas.offsetWidth, this.mouseY = 480 * (e.clientY - t.y) / this.canvas.offsetHeight, this.hasMoved = !0
    }, t.handleMouseDown = function(e) {
      this.buttonStates[e.button] = !0, horde.stopEvent(e), window.focus && window.focus()
    }, t.handleMouseUp = function(e) {
      this.buttonStates[e.button] = !1
    }, t.isButtonDown = function(e) {
      return this.buttonStates[e]
    }, t.isAnyButtonDown = function() {
      for (var e in this.buttonStates)
        if (this.buttonStates[e]) return !0;
      return !1
    }, t.clearButtons = function() {
      this.buttonStates = {}
    }, t.wasButtonClicked = function(e) {
      return this.buttonStates[e] && !this.lastButtonStates[e]
    }, t.storeButtonStates = function() {
      for (var e in this.buttonStates) this.lastButtonStates[e] = this.buttonStates[e]
    }
  }(), horde.isDemo = function() {
    return !1
  }, horde.populateWaves = function(e) {
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "bat", 1), t.addObjects(1, "bat", 1), t.addObjects(2, "bat", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "goblin", 2), t.addObjects(1, "goblin", 2), t.addObjects(2, "goblin", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "cyclops", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "demoblin", 2), t.addObjects(1, "demoblin", 3), t.addObjects(2, "demoblin", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 500), t.addSpawnPoint(1, 750), t.addSpawnPoint(2, 500), t.addObjects(0, "bat", 5), t.addObjects(0, "goblin", 2), t.addObjects(1, "goblin", 2), t.addObjects(1, "cyclops", 1), t.addObjects(1, "goblin", 3), t.addObjects(2, "bat", 5), t.addObjects(2, "goblin", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 200), t.addSpawnPoint(1, 200), t.addSpawnPoint(2, 200), t.addObjects(0, "bat", 10), t.addObjects(1, "bat", 10), t.addObjects(2, "bat", 10), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "demoblin", 3), t.addObjects(1, "cyclops", 1), t.addObjects(1, "goblin", 5), t.addObjects(2, "demoblin", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 5e3), t.addSpawnPoint(1, 1500), t.addSpawnPoint(2, 5e3), t.addObjects(0, "imp", 5), t.addObjects(1, "imp", 10), t.addObjects(2, "imp", 5), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 750), t.addSpawnPoint(1, 750), t.addSpawnPoint(2, 750), t.addObjects(0, "cyclops", 1), t.addObjects(2, "cyclops", 1), t.addObjects(0, "bat", 10), t.addObjects(1, "bat", 10), t.addObjects(2, "bat", 10), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "cube", 1), t.bossWave = !0, t.bossName = "Gelatinous Cube", e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2e4), t.addSpawnPoint(1, 2e4), t.addSpawnPoint(2, 2e4), t.addObjects(0, "sandworm", 2), t.addObjects(1, "sandworm", 2), t.addObjects(2, "sandworm", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e4), t.addSpawnPoint(1, 1e4), t.addSpawnPoint(2, 1e4), t.addObjects(0, "wizard", 2), t.addObjects(1, "wizard", 2), t.addObjects(2, "wizard", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 7500), t.addSpawnPoint(1, 7500), t.addSpawnPoint(2, 7500), t.addObjects(0, "flaming_skull", 2), t.addObjects(1, "flaming_skull", 2), t.addObjects(2, "flaming_skull", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 15e3), t.addSpawnPoint(1, 1500), t.addSpawnPoint(2, 15e3), t.addObjects(0, "owlbear", 1), t.addObjects(2, "owlbear", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "huge_skull", 1), t.addObjects(1, "huge_skull", 1), t.addObjects(2, "huge_skull", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 500), t.addSpawnPoint(1, 4e3), t.addSpawnPoint(2, 500), t.addObjects(0, "dire_bat", 5), t.addObjects(0, "hunter_goblin", 2), t.addObjects(0, "dire_bat", 5), t.addObjects(0, "hunter_goblin", 2), t.addObjects(1, "sandworm", 2), t.addObjects(2, "dire_bat", 5), t.addObjects(2, "hunter_goblin", 2), t.addObjects(2, "dire_bat", 5), t.addObjects(2, "hunter_goblin", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e3), t.addSpawnPoint(1, 1500), t.addSpawnPoint(2, 3e3), t.addObjects(0, "flaming_skull", 2), t.addObjects(1, "imp", 5), t.addObjects(1, "wizard", 3), t.addObjects(2, "flaming_skull", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1500), t.addSpawnPoint(1, 1500), t.addSpawnPoint(2, 1500), t.addObjects(0, "cyclops", 1), t.addObjects(0, "goblin", 5), t.addObjects(1, "demoblin", 3), t.addObjects(1, "owlbear", 1), t.addObjects(1, "demoblin", 5), t.addObjects(2, "goblin", 5), t.addObjects(2, "cyclops", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3500), t.addSpawnPoint(1, 4e3), t.addSpawnPoint(2, 5e3), t.addObjects(0, "wizard", 5), t.addObjects(1, "imp", 5), t.addObjects(1, "owlbear", 1), t.addObjects(2, "sandworm", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "superclops", 1), t.bossWave = !0, t.bossName = "Minotaur", e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 100), t.addSpawnPoint(1, 100), t.addSpawnPoint(2, 100), t.addObjects(0, "bat", 15), t.addObjects(1, "dire_bat", 15), t.addObjects(2, "bat", 15), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1500), t.addSpawnPoint(1, 1500), t.addSpawnPoint(2, 1500), t.addObjects(0, "goblin", 15), t.addObjects(1, "hunter_goblin", 15), t.addObjects(2, "goblin", 15), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2e3), t.addSpawnPoint(1, 2e3), t.addSpawnPoint(2, 2e3), t.addObjects(0, "demoblin", 12), t.addObjects(1, "demoblin", 12), t.addObjects(2, "demoblin", 12), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 25e3), t.addSpawnPoint(1, 25e3), t.addSpawnPoint(2, 25e3), t.addObjects(0, "cyclops", 2), t.addObjects(1, "cyclops", 2), t.addObjects(2, "cyclops", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e3), t.addSpawnPoint(1, 3e3), t.addSpawnPoint(2, 3e3), t.addObjects(0, "imp", 10), t.addObjects(1, "imp", 10), t.addObjects(2, "imp", 10), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 25e3), t.addSpawnPoint(1, 25e3), t.addSpawnPoint(2, 25e3), t.addObjects(0, "owlbear", 2), t.addObjects(1, "owlbear", 2), t.addObjects(2, "owlbear", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 12e3), t.addSpawnPoint(1, 12e3), t.addSpawnPoint(2, 12e3), t.addObjects(0, "wizard", 4), t.addObjects(1, "wizard", 4), t.addObjects(2, "wizard", 4), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 15e3), t.addSpawnPoint(1, 2e4), t.addSpawnPoint(2, 15e3), t.addObjects(0, "flaming_skull", 5), t.addObjects(1, "huge_skull", 3), t.addObjects(2, "flaming_skull", 5), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 15e3), t.addSpawnPoint(1, 15e3), t.addSpawnPoint(2, 15e3), t.addObjects(0, "sandworm", 5), t.addObjects(1, "sandworm", 5), t.addObjects(2, "sandworm", 5), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "dragon", 1), t.bossWave = !0, t.bossName = "Green Dragon", e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3500), t.addSpawnPoint(1, 3500), t.addSpawnPoint(2, 3500), t.addObjects(0, "goblin", 25), t.addObjects(1, "demoblin", 25), t.addObjects(2, "hunter_goblin", 25), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 7500), t.addSpawnPoint(1, 5e3), t.addSpawnPoint(2, 7500), t.addObjects(0, "sandworm", 2), t.addObjects(0, "wizard", 3), t.addObjects(1, "imp", 10), t.addObjects(2, "sandworm", 2), t.addObjects(2, "wizard", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 15e3), t.addSpawnPoint(1, 7500), t.addSpawnPoint(2, 15e3), t.addObjects(0, "owlbear", 3), t.addObjects(1, "flaming_skull", 6), t.addObjects(2, "owlbear", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2500), t.addSpawnPoint(1, 15e3), t.addSpawnPoint(2, 2500), t.addObjects(0, "demoblin", 10), t.addObjects(0, "goblin", 10), t.addObjects(1, "cyclops", 1), t.addObjects(1, "owlbear", 1), t.addObjects(1, "cyclops", 1), t.addObjects(1, "owlbear", 1), t.addObjects(2, "demoblin", 10), t.addObjects(2, "goblin", 10), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 12500), t.addSpawnPoint(1, 2e4), t.addSpawnPoint(2, 12500), t.addObjects(0, "sandworm", 5), t.addObjects(1, "huge_skull", 1), t.addObjects(1, "owlbear", 1), t.addObjects(1, "cyclops", 1), t.addObjects(1, "huge_skull", 1), t.addObjects(2, "sandworm", 5), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2e4), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 2e4), t.addObjects(0, "cyclops", 1), t.addObjects(0, "flaming_skull", 1), t.addObjects(1, "wizard", 8), t.addObjects(2, "cyclops", 1), t.addObjects(2, "flaming_skull", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 4e3), t.addSpawnPoint(1, 1e4), t.addSpawnPoint(2, 4e3), t.addObjects(0, "demoblin", 8), t.addObjects(1, "owlbear", 2), t.addObjects(2, "demoblin", 8), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 5e3), t.addSpawnPoint(1, 7500), t.addSpawnPoint(2, 5e3), t.addObjects(0, "sandworm", 1), t.addObjects(0, "wizard", 3), t.addObjects(1, "flaming_skull", 4), t.addObjects(1, "huge_skull", 1), t.addObjects(2, "sandworm", 1), t.addObjects(2, "wizard", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2e3), t.addSpawnPoint(1, 2500), t.addSpawnPoint(2, 2e3), t.addObjects(0, "goblin", 30), t.addObjects(1, "demoblin", 25), t.addObjects(2, "hunter_goblin", 30), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "beholder", 1), t.bossWave = !0, t.bossName = "Beholder", e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e3), t.addSpawnPoint(1, 3e3), t.addSpawnPoint(2, 3e3), t.addObjects(0, "cyclops", 2), t.addObjects(1, "owlbear", 2), t.addObjects(2, "cyclops", 2), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "wizard", 3), t.addObjects(0, "flaming_skull", 1), t.addObjects(1, "wizard", 3), t.addObjects(1, "huge_skull", 1), t.addObjects(2, "wizard", 3), t.addObjects(2, "flaming_skull", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e3), t.addSpawnPoint(1, 3e3), t.addSpawnPoint(2, 3e3), t.addObjects(0, "sandworm", 3), t.addObjects(0, "owlbear", 1), t.addObjects(1, "sandworm", 3), t.addObjects(1, "huge_skull", 1), t.addObjects(2, "sandworm", 3), t.addObjects(2, "cyclops", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 200), t.addSpawnPoint(1, 200), t.addSpawnPoint(2, 200), t.addObjects(0, "dire_bat", 20), t.addObjects(0, "wizard", 2), t.addObjects(0, "cyclops", 1), t.addObjects(1, "dire_bat", 20), t.addObjects(1, "sandworm", 2), t.addObjects(1, "owlbear", 1), t.addObjects(2, "dire_bat", 20), t.addObjects(2, "wizard", 2), t.addObjects(2, "cyclops", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e3), t.addSpawnPoint(1, 3e3), t.addSpawnPoint(2, 3e3), t.addObjects(0, "goblin", 10), t.addObjects(0, "cyclops", 1), t.addObjects(0, "wizard", 3), t.addObjects(1, "demoblin", 10), t.addObjects(1, "huge_skull", 1), t.addObjects(1, "sandworm", 3), t.addObjects(2, "hunter_goblin", 10), t.addObjects(2, "owlbear", 1), t.addObjects(2, "flaming_skull", 3), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 2500), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 2500), t.addObjects(0, "wizard", 4), t.addObjects(1, "cube", 1), t.addObjects(2, "wizard", 4), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 1e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 1e3), t.addObjects(0, "demoblin", 5), t.addObjects(1, "superclops", 1), t.addObjects(1, "demoblin", 4), t.addObjects(2, "demoblin", 5), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 3e4), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 3e4), t.addObjects(0, "sandworm", 1), t.addObjects(0, "owlbear", 1), t.addObjects(1, "dragon", 1), t.addObjects(2, "sandworm", 1), t.addObjects(2, "owlbear", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(0, 15e3), t.addSpawnPoint(1, 1e3), t.addSpawnPoint(2, 15e3), t.addObjects(0, "wizard", 1), t.addObjects(0, "cyclops", 1), t.addObjects(1, "beholder", 1), t.addObjects(2, "wizard", 1), t.addObjects(2, "cyclops", 1), e.waves.push(t);
    var t = new horde.SpawnWave;
    t.addSpawnPoint(1, 1e3), t.addObjects(1, "doppelganger", 1), t.bossWave = !0, t.bossName = "Doppelganger", e.waves.push(t)
  },
  function() {
    var e = "1.4.0",
      t = 640,
      i = 480,
      s = "https://chrome.google.com/extensions/detail/khodnfbkbanejphecblcofbghjdgfaih",
      a = 1e3,
      o = "high_score",
      n = "rgb(0, 0, 0)",
      r = "rgb(241, 241, 242)",
      h = 40,
      d = .7,
      p = 24,
      c = 270,
      l = 70,
      u = 4,
      m = .2,
      w = 64,
      g = 3;
    horde.Engine = function() {
      this.lastUpdate = 0, this.canvases = {}, this.map = null, this.spawnPoints = [], this.objects = {}, this.objectIdSeed = 0, this.playerObjectId = null, this.keyboard = new horde.Keyboard, this.view = new horde.Size(t, i), this.images = null, this.debug = !1, this.konamiEntered = !1, this.running = !1, this.gateDirection = "", this.gateState = "down", this.gatesX = 0, this.gatesY = 0, this.pointerY = 0, this.pointerYStart = 0, this.maxPointerY = 0, this.pointerOptionsStart = 0, this.targetReticle = {
        position: new horde.Vector2,
        angle: 0,
        moving: !1
      }, this.enableFullscreen = !1, this.enableClouds = !1, this.cloudTimer = null, this.woundsToSpeed = 10, this.introTimer = new horde.Timer, this.introPhase = 0, this.introPhaseInit = !1, this.wonGame = !1, this.wonGamePhase = 0, this.weaponPickup = {
        type: null,
        state: "off",
        alpha: 1,
        scale: 1,
        position: new horde.Vector2
      }, this.coinPickup = {
        amount: 0,
        state: "off",
        alpha: 1,
        position: new horde.Vector2
      }, this.touchMove = !1, this.canMute = !0, this.canFullscreen = !1, this.wasdMovesArrowsAttack = !0
    };
    var b = horde.Engine.prototype;
    b.cacheBust = function() {
      return -1 !== e.indexOf("VERSION") ? "?cachebust=" + horde.Timer.now() : "?cachebust=" + e
    }, b.resize = function() {
      var e = window.innerWidth,
        t = window.innerHeight,
        i = document.getElementById("stage"),
        s = t - i.offsetTop;
      if (i.style.height = s + "px", this.enableFullscreen) {
        height = s - 50, height < 480 && (height = 480), height > 768 && (height = 768);
        var a = Math.round(1.333 * height)
      } else a = 640, height = 480;
      var o = this.canvases.display;
      o.style.width = a + "px", o.style.height = height + "px";
      var n = Math.max(e / 2 - a / 2, 0),
        r = Math.max(s / 2 - height / 2, 30);
      o.style.left = n + "px", o.style.top = r + "px";
      var h = document.getElementById("tip");
      h && (h.style.top = r - 30 + "px", h.style.left = n + "px", h.style.width = a + "px")
    }, b.run = function() {
      this.init(), this.lastUpdate = horde.now(), this.start()
    }, b.start = function() {
      this.running || (this.running = !0, this.requestFrame())
    }, b.stop = function() {
      this.running && (this.running = !1)
    }, b.togglePause = function() {
      var e = !1;
      return function() {
        this.getPlayerObject().hasState(horde.Object.states.DYING) || (this.paused ? (this.paused = !1, horde.sound.setMuted(e), horde.sound.play("unpause"), horde.sound.play(this.currentMusic)) : (this.paused = !0, this.initOptions(), e = horde.sound.isMuted(), horde.sound.play("pause"), horde.sound.stop(this.currentMusic)))
      }
    }(), b.addObject = function(e) {
      this.objectIdSeed++;
      var t = "o" + this.objectIdSeed;
      return e.id = t, this.objects[t] = e, t
    }, b.getBarColor = function(e, t) {
      var i = t / e * 100;
      return i > 50 ? "rgb(98, 187, 70)" : i > 25 ? "rgb(246, 139, 31)" : "rgb(238, 28, 36)"
    }, b.spawnObject = function(e, t, i, s) {
      for (var a = i || e.facing, o = horde.makeObject(t, !0), n = e; null !== n.ownerId && this.objects[n.ownerId];) n = this.objects[n.ownerId];
      return s !== !1 && (o.ownerId = n.id, o.team = e.team), o.centerOn(e.boundingBox().center()), o.setDirection(a), o.init(), this.addObject(o)
    }, b.objectExists = function(e) {
      return this.objects[e]
    }, b.getPlayerObject = function() {
      return this.objects[this.playerObjectId]
    }, b.getObjectCountByType = function(e) {
      var t = 0;
      for (var i in this.objects) {
        var s = this.objects[i];
        s.type === e && t++
      }
      return t
    }, b.isAlive = function(e) {
      if (this.objects[e]) {
        var t = this.objects[e];
        return t.alive && t.wounds < t.hitPoints
      }
      return !1
    }, b.preloadComplete = function() {
      this.state = "intro", this.logoAlpha = 0, this.logoFade = "in", this.logoFadeSpeed = .5
    }, b.init = function() {
      this.state = "intro", this.canvases.display = horde.makeCanvas("display", this.view.width, this.view.height), this.canvases.buffer = horde.makeCanvas("buffer", this.view.width, this.view.height, !0), this.canvases.waveText = horde.makeCanvas("waveText", this.view.width, this.view.height, !0), this.resize(), horde.on("resize", this.resize, window, this), this.mouse = new horde.Mouse(this.canvases.display), horde.on("contextmenu", function(e) {
        horde.stopEvent(e)
      }, document.body, this), horde.on("blur", function() {
        "running" != this.state || this.wonGame || (this.keyboard.keyStates = {}, this.paused || this.togglePause(), this.stop())
      }, window, this), horde.on("focus", function() {
        this.start()
      }, window, this), this.preloader = new horde.ImageLoader, this.preloader.load({
        ui: "img/sheet_ui.png" + this.cacheBust()
      }, this.preloadComplete, this), this.images = new horde.ImageLoader, this.images.load({
        arena: "img/sheet_arena.png" + this.cacheBust(),
        characters: "img/sheet_characters.png" + this.cacheBust(),
        objects: "img/sheet_objects.png" + this.cacheBust(),
        beholder: "img/sheet_beholder.png" + this.cacheBust()
      }, this.handleImagesLoaded, this);
      var e = this.getData(o);
      null === e && this.putData(o, a), this.initSound()
    }, b.initSound = function() {
      horde.sound.init(function() {
        var e = "sound/music/",
          t = "sound/effects/",
          i = horde.sound;
        i.create("normal_battle_music", e + "normal_battle", !0, 20), i.create("final_battle_music", e + "final_battle", !0, 20), i.create("victory", e + "victory", !0, 20), i.create("move_pointer", t + "move_pointer", !1, 50), i.create("select_pointer", t + "select_pointer", !1, 50), i.create("pause", t + "pause"), i.create("unpause", t + "unpause"), i.create("code_entered", t + "code_entered"), i.create("gate_opens", t + "gate_opens"), i.create("gate_closes", t + "gate_closes"), i.create("spike_attack", t + "spike_attacks"), i.create("immunity", t + "immunity", !1, 25), i.create("coins", t + "coins", !1, 10), i.create("eat_food", t + "eat_food", !1, 30), i.create("pickup_weapon", t + "pickup_weapon"), i.create("weapon_wall", t + "weapon_wall", !1, 25), i.create("fire_attack", t + "char_attacks_fire"), i.create("hero_attacks", t + "char_attacks"), i.create("hero_damage", t + "char_damage_3"), i.create("hero_dies", t + "char_dies"), i.create("bat_damage", t + "bat_damage"), i.create("bat_dies", t + "bat_dies"), i.create("goblin_attacks", t + "goblin_attacks"), i.create("goblin_damage", t + "goblin_damage"), i.create("goblin_dies", t + "goblin_dies"), i.create("demoblin_attacks", t + "demoblin_attacks", !1, 80), i.create("imp_damage", t + "imp_damage", !1, 30), i.create("imp_dies", t + "imp_dies", !1, 30), i.create("gel_damage", t + "gel_damage", !1, 20), i.create("gel_dies", t + "gel_dies", !1, 20), i.create("skull_damage", t + "skull_damage", !1, 25), i.create("skull_dies", t + "skull_dies", !1, 5), i.create("wizard_attacks", t + "wizard_attacks", !1, 25), i.create("wizard_disappear", t + "wizard_disappear", !1, 50), i.create("wizard_reappear", t + "wizard_reappear", !1, 50), i.create("sandworm_attacks", t + "sandworm_attacks", !1, 75), i.create("sandworm_dies", t + "sandworm_dies", !1, 40), i.create("cyclops_attacks", t + "cyclops_attacks"), i.create("cyclops_damage", t + "cyclops_damage"), i.create("cyclops_dies", t + "cyclops_dies"), i.create("owlbear_alarm", t + "owlbear_alarm", !1, 20), i.create("owlbear_attacks", t + "owlbear_attacks", !1, 15), i.create("owlbear_damage", t + "owlbear_damage", !1, 40), i.create("owlbear_dies", t + "owlbear_dies", !1, 50), i.create("cube_attacks", t + "cube_attacks"), i.create("cube_damage", t + "cube_damage"), i.create("cube_dies", t + "cube_dies"), i.create("minotaur_attacks", t + "minotaur_attacks"), i.create("minotaur_damage", t + "minotaur_damage"), i.create("minotaur_dies", t + "minotaur_dies"), i.create("dragon_attacks", t + "dragon_attacks"), i.create("dragon_damage", t + "dragon_damage"), i.create("dragon_dies", t + "dragon_dies"), i.create("beholder_damage", t + "beholder_damage", !1, 50), i.create("beholder_dies", t + "beholder_dies", !1, 25), i.create("eyelet_damage", t + "eyelet_damage", !1, 25), i.create("eyelet_dies", t + "eyelet_dies", !1, 25), i.create("dopp_attacks", t + "dopp_attacks", !1, 50), i.create("dopp_damage", t + "dopp_damage", !1, 50), i.create("dopp_dies", t + "dopp_dies")
      })
    }, b.initGame = function() {
      this.konamiEntered = !1, this.enableClouds = !1, this.closeGates(), this.objects = {}, this.state = "title", this.initOptions(), this.initMap(), this.initSpawnPoints(), this.initWaves(), this.initPlayer(), this.gameOverBg = null, this.monstersAlive = 0, this.gotNewHighScore = 0, this.scoreCount = 0, this.statsCount = 0, this.statsIncrement = 0, this.statsIndex = 0, this.statsTimer = null, this.highScoreSaved = !1, this.wonGame = !1, this.wonGamePhase = 0, this.showReticle = !1, this.hideReticleTimer = null, this.showTutorial = !1, this.tutorialIndex = 0, this.tutorialY = -l, this.tutorialDirection = "down", this.hideTutorialTimer = null, this.nextTutorialTimer = null, this.heroFiring = !1, this.heroFiringDirection = null, this.woundsTo = 0, this.gameStartTime = horde.now()
    }, b.initMap = function() {
      this.tileSize = new horde.Size(32, 32), this.map = [
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }, b.initSpawnPoints = function() {
      this.spawnPoints = [], this.spawnPoints.push(new horde.SpawnPoint(3 * this.tileSize.width, -2 * this.tileSize.height, 2 * this.tileSize.width, 2 * this.tileSize.height)), this.spawnPoints.push(new horde.SpawnPoint(9 * this.tileSize.width, -2 * this.tileSize.height, 2 * this.tileSize.width, 2 * this.tileSize.height)), this.spawnPoints.push(new horde.SpawnPoint(15 * this.tileSize.width, -2 * this.tileSize.height, 2 * this.tileSize.width, 2 * this.tileSize.height))
    }, b.initSpawnWave = function(e) {
      var t = 0;
      for (var i in e.points) {
        var s = e.points[i],
          a = this.spawnPoints[s.spawnPointId];
        a.delay = s.delay, a.lastSpawnElapsed = a.delay;
        for (var o in s.objects) {
          var n = s.objects[o];
          a.queueSpawn(n.type, n.count)
        }
        var r = (a.queue.length - 1) * a.delay;
        r > t && (t = r)
      }
      var h = t + e.nextWaveTime;
      this.waveTimer.start(h), this.openGates()
    }, b.initWaves = function() {
      this.waves = [], this.waveTimer = new horde.Timer, this.waveTimer.start(1), this.currentWaveId = -1, this.waveText = {
        string: "",
        size: 20,
        state: "off",
        alpha: 0
      }, horde.populateWaves(this)
    }, b.initPlayer = function() {
      var e = horde.makeObject("hero");
      e.weapons = [{
        type: "h_sword",
        count: null
      }], e.centerOn(horde.Vector2.fromSize(this.view).scale(.5)), this.playerObjectId = this.addObject(e), this.touchMove && (this.targetReticle.position = e.boundingBox().center());

    }, b.handleImagesLoaded = function() {
      this.imagesLoaded = !0
    }, b.logoFadeOut = function() {
      this.logoFade = "out"
    }, b.updateLogo = function(e) {
      {
        var t = this.keyboard;
        horde.Keyboard.Keys
      }(this.keyboard.isAnyKeyPressed() || this.mouse.isAnyButtonDown()) && (t.clearKeys(), this.mouse.clearButtons(), this.initGame()), "in" === this.logoFade ? (this.logoAlpha += this.logoFadeSpeed / 1e3 * e, this.logoAlpha >= 1 && (this.logoAlpha = 1, this.logoFade = "none", horde.setTimeout(1e3, this.logoFadeOut, this))) : "out" === this.logoFade && (this.logoAlpha -= this.logoFadeSpeed / 1e3 * e, this.logoAlpha <= 0 && (this.logoAlpha = 0, this.logoFade = "none", this.initGame()))
    }, b.updateIntroCinematic = function(e) {
      switch (this.introTimer.update(e), this.introPhase) {
        case 0:
          this.introPhaseInit || (this.introFadeAlpha = 0, this.introPhaseInit = !0), this.introFadeAlpha += .001 * e, this.introFadeAlpha >= 1 && (this.introFadeAlpha = 1, this.introPhase++, this.introPhaseInit = !1);
          break;
        case 1:
          this.introPhaseInit || (this.introFadeAlpha = 1, this.introPhaseInit = !0), this.introFadeAlpha -= 5e-4 * e, this.introFadeAlpha <= 0 && (this.introFadeAlpha = 0, this.introPhase++, this.introPhaseInit = !1);
          break;
        case 2:
          this.introPhaseInit || (this.introTimer.start(1e3), this.introPhaseInit = !0), this.introTimer.expired() && (this.introPhase++, this.introPhaseInit = !1);
          break;
        case 3:
          this.introPhaseInit || (this.openGates(), this.introPhaseInit = !0), "up" === this.gateState && (this.introPhase++, this.introPhaseInit = !1);
          break;
        case 4:
          if (!this.introPhaseInit) {
            var t = horde.makeObject("hero");
            t.position.x = 304, t.position.y = -64, t.collidable = !1, t.setDirection(new horde.Vector2(0, 1)), this.introHero = t, this.introPhaseInit = !0
          }
          this.introHero.update(e), this.moveObject(this.introHero, e), this.introHero.position.y >= 222 && (this.introHero.centerOn(horde.Vector2.fromSize(this.view).scale(.5)), this.introHero.stopMoving(), this.introPhase++, this.introPhaseInit = !1);
          break;
        case 5:
        case 6:
        case 8:
          this.introPhaseInit || (this.introTimer.start(500), this.introPhaseInit = !0), this.introTimer.expired() && (this.introPhase++, this.introPhaseInit = !1);
          break;
        case 7:
          this.introPhaseInit || (this.closeGates(), this.introPhaseInit = !0), "down" === this.gateState && (this.introPhase++, this.introPhaseInit = !1);
          break;
        case 9:
          this.introPhaseInit || (this.introTimer.start(1e3), this.introPhaseInit = !0), this.introHero.update(e), this.introTimer.expired() && (this.currentMusic = "normal_battle_music", horde.sound.play(this.currentMusic), this.state = "running")
      }
    }, b.update = function() {
      var e = horde.now(),
        t = e - this.lastUpdate;
      if (this.lastUpdate = e, this.lastElapsed = t, this.imagesLoaded !== !0) return void this.requestFrame();
      switch (this.state) {
        case "intro":
          this.updateLogo(t), this.render();
          break;
        case "title":
          this.handleInput(), this.updateFauxGates(t), this.render();
          break;
        case "credits":
          this.handleInput(), this.render();
          break;
        case "intro_cinematic":
          this.handleInput(), this.updateIntroCinematic(t), this.updateFauxGates(t), this.render();
          break;
        case "running":
          this.wonGame ? this.updateWonGame(t) : this.handleInput(), this.paused || (this.updateWaves(t), this.updateSpawnPoints(t), this.updateClouds(t), this.updateObjects(t), this.updateFauxGates(t), this.updateWeaponPickup(t), this.updateCoinPickup(t)), this.showTutorial && this.updateTutorial(t), this.render();
          break;
        case "game_over":
          this.updateGameOver(t), this.render();
          break;
        case "buy_now":
          this.handleInput(), this.render()
      }
      this.hideReticleTimer || (this.hideReticleTimer = new horde.Timer), this.mouse.hasMoved && (this.showReticle = !0, this.hideReticleTimer.start(5e3), this.nextTutorial(3)), this.hideReticleTimer.update(t), this.hideReticleTimer.expired() && (this.showReticle = !1), this.mouse.hasMoved = !1, this.requestFrame()
    }, b.requestFrame = function() {
      this.running && requestAnimationFrame(bind(this, this.update))
    }, b.updateWeaponPickup = function(e) {
      var t = this.weaponPickup;
      "on" === t.state && (t.scale += .0045 * e, t.alpha -= .0025 * e, t.alpha <= 0 && (t.state = "off"))
    }, b.updateCoinPickup = function(e) {
      var t = this.coinPickup;
      "on" === t.state && (t.position.y -= .05 * e, t.alpha -= 7e-4 * e, t.alpha <= 0 && (t.state = "off"))
    }, b.updateWonGame = function(e) {
      var t = this.getPlayerObject();
      switch (this.roseTimer && this.roseTimer.update(e), this.wonGamePhase) {
        case 0:
          var i = new horde.Vector2(304, 192);
          t.moveToward(i);
          var s = t.position.clone().subtract(i).abs();
          s.x <= 5 && s.y <= 5 && this.wonGamePhase++;
          break;
        case 1:
          t.setDirection(new horde.Vector2(0, 1)), t.stopMoving(), t.addState(horde.Object.states.VICTORIOUS), this.roseTimer = new horde.Timer, this.roseTimer.start(100), this.rosesThrown = 0, this.wonGamePhase++;
          break;
        case 2:
          if (this.roseTimer.expired()) {
            ++this.rosesThrown;
            var a = horde.makeObject("rose");
            2 === horde.randomRange(1, 2) ? (a.position.x = -32, a.position.y = horde.randomRange(100, 300), a.setDirection(new horde.Vector2(1, 0))) : (a.position.x = 682, a.position.y = horde.randomRange(100, 300), a.setDirection(new horde.Vector2(-1, 0))), this.addObject(a), this.roseTimer.reset()
          }
          this.rosesThrown > 100 && this.endGame()
      }
    }, b.updateClouds = function(e) {
      if (this.enableClouds === !0) {
        null === this.cloudTimer && (this.cloudTimer = new horde.Timer, this.cloudTimer.start(2e3)), this.cloudTimer.update(e);
        var s = 0;
        for (var a in this.objects) {
          var o = this.objects[a];
          "cloud" === o.type && (s++, o.position.x < -o.size.width && o.die())
        }
        if (10 > s && this.cloudTimer.expired()) {
          if (horde.randomRange(1, 10) >= 1)
            for (var n = horde.randomRange(1, 3), r = 0; n > r; r++) {
              var h = horde.makeObject("cloud");
              h.position.x = t + horde.randomRange(1, 32), h.position.y = horde.randomRange(-(h.size.height / 2), i + h.size.height / 2), h.setDirection(new horde.Vector2(-1, 0)), this.addObject(h)
            }
          this.cloudTimer.reset()
        }
      }
    }, b.updateSpawnPoints = function(e) {
      if ("up" === this.gateState) {
        var t = !0;
        for (var i in this.spawnPoints) {
          this.spawnPoints[i].queue.length >= 1 && (t = !1);
          var s = this.spawnPoints[i].update(e, 0 === this.monstersAlive);
          s !== !1 && this.addObject(s)
        }
        t && !this.monstersAboveGates && this.closeGates()
      }
    }, b.spawnWaveExtras = function(e) {
      switch (e) {
        case 1:
          var t = this.getPlayerObject(),
            i = horde.makeObject("item_weapon_knife");
          i.position = t.position.clone(), i.position.x -= 96, i.position.y += 64, this.addObject(i);
          var i = horde.makeObject("item_weapon_spear");
          i.position = t.position.clone(), i.position.x -= 32, i.position.y += 64, this.addObject(i);
          var i = horde.makeObject("item_weapon_axe");
          i.position = t.position.clone(), i.position.x += 32, i.position.y += 64, this.addObject(i);
          var i = horde.makeObject("item_weapon_fireball");
          i.position = t.position.clone(), i.position.x += 96, i.position.y += 64, this.addObject(i);
          break;
        case 11:
          for (var s = [{
              x: 192,
              y: 224
            }, {
              x: 416,
              y: 224
            }], a = s.length, o = 0; a > o; ++o) {
            var n = s[o],
              r = horde.makeObject("spikes");
            r.position = new horde.Vector2(n.x, n.y), this.addObject(r)
          }
          break;
        case 21:
          for (var h = [{
              x: 32,
              y: 64
            }, {
              x: 32,
              y: 352
            }, {
              x: 576,
              y: 64
            }, {
              x: 576,
              y: 352
            }], a = h.length, o = 0; a > o; o++) {
            var n = h[o],
              r = horde.makeObject("spike_sentry");
            r.position = new horde.Vector2(n.x, n.y), this.addObject(r)
          }
          break;
        case 31:
          for (var s = [{
              x: 304,
              y: 114
            }, {
              x: 304,
              y: 304
            }], a = s.length, o = 0; a > o; ++o) {
            var n = s[o],
              r = horde.makeObject("spikes");
            r.position = new horde.Vector2(n.x, n.y), this.addObject(r)
          }
          break;
        case 41:
          this.enableClouds = !0;
          break;
        case 50:
          for (var d in this.objects) {
            var p = this.objects[d];
            "trap" === p.role && p.die()
          }
      }
    }, b.updateWaves = function(e) {
      if (!this.wonGame) {
        this.waveTimer.update(e);
        var s = !0;
        for (var a in this.spawnPoints) this.spawnPoints[a].queue.length > 0 && (s = !1);
        if (s === !0 && 0 === this.monstersAlive) {
          if (this.currentWaveId === this.waves.length - 1) return this.wonGame = !0, horde.sound.stop("normal_battle_music"), horde.sound.stop("final_battle_music"), void horde.sound.play("victory");
          this.currentWaveId++;
          var o = this.currentWaveId + 1;
          if (this.continuing || this.waveHack) {
            for (var r = this.waveHack ? 1 : 2, d = r; o >= d; ++d) this.spawnWaveExtras(d);
            this.waveHack = !1
          } else this.spawnWaveExtras(o);
          //manejo de las oleadas
          var p = "Wave " + o,
            c = "normal_battle_music";
          o > 1 && (this.putData("checkpoint_wave", this.currentWaveId), this.putData("checkpoint_hero", JSON.stringify(this.getPlayerObject()))), this.waves[this.currentWaveId].bossWave && (p = "Boss: " + this.waves[this.currentWaveId].bossName + "!", c = "final_battle_music"), this.currentMusic !== c && (horde.sound.stop(this.currentMusic), this.currentMusic = c, horde.sound.play(this.currentMusic)), this.initSpawnWave(this.waves[this.currentWaveId]), this.waveText.string = p, this.waveText.alpha = 0, this.waveText.size = 1, this.waveText.state = "init";
          var l = this.canvases.waveText.getContext("2d"),
            u = this.waveText.string;
          l.clearRect(0, 0, t, i), l.save(), l.font = "Bold " + h + "px MedievalSharp", l.lineWidth = 3, l.textBaseline = "top", l.strokeStyle = n, l.fillStyle = "rgb(230, 103, 8)", l.strokeText(u, 0, 0), l.fillText(u, 0, 0);
          var m = l.measureText(u);
          this.waveText.width = m.width, l.restore(), this.continuing = !1
        }
        switch (this.waveText.state) {
          case "init":
            this.waveText.alpha += .002 * e, this.waveText.alpha >= 1 && (this.waveText.alpha = 1, this.waveText.timer = new horde.Timer, this.waveText.timer.start(250), this.waveText.state = "display");
            break;
          case "display":
            this.waveText.timer.update(e), this.waveText.timer.expired() && (this.waveText.state = "hide");
            break;
          case "hide":
            this.waveText.alpha -= .0015 * e, this.waveText.size += .02 * e, this.waveText.alpha <= 0 && (this.waveText.alpha = 0, this.waveText.state = "off")
        }
      }
    }, b.updateGameOver = function(e) {
      this.gameOverAlpha || (this.gameOverReady = !1, this.gameOverAlpha = 0);
      var t = 2e-4 * e;
      if (this.gameOverAlpha += Number(t) || 0, this.gameOverAlpha >= .75 && (this.gameOverReady = !0, this.gameOverAlpha = .75), this.gameOverReady && (this.statsTimer || (this.statsTimer = new horde.Timer, this.statsCount = 0, this.statsIndex = 0, this.statsTimer.start(50), this.statsIncrement = 1), this.statsTimer.update(e), this.statsTimer.expired() && (this.statsTimer.reset(), this.statsCount += this.statsIncrement)), this.statsIndex >= 4 && !this.highScoreSaved) {
        this.highScoreSaved = !0;
        var i = Number(this.getData(o)),
          s = this.getTotalScore();
        s > i && (this.putData(o, s), horde.sound.play("victory"), this.gotNewHighScore = !0)
      }
    }, b.openGates = function() {
      "up" !== this.gateState && (this.gateDirection = "up", horde.sound.play("gate_opens"))
      //Manejo de las oleadas
      // this.state = "game_over"
    }, b.closeGates = function() {
      "down" !== this.gateState && (this.gateDirection = "down", horde.sound.play("gate_closes"))
    }, b.updateFauxGates = function(e) {
      "down" === this.gateDirection && (this.gatesX = 0, this.gatesY += .2 * e, this.gatesY >= 0 && (this.gatesX = 0, this.gatesY = 0, this.gateDirection = "", this.gateState = "down")), "up" === this.gateDirection && (this.gatesX = horde.randomRange(-1, 1), this.gatesY -= .05 * e, this.gatesY <= -54 && (this.gatesX = 0, this.gatesY = -54, this.gateDirection = "", this.gateState = "up"))
    }, b.updateTutorial = function(e) {
      var t = .1;
      "down" === this.tutorialDirection && (this.tutorialY += t * e, this.tutorialY >= 0 && (this.tutorialY = 0, this.tutorialDirection = null, this.tutorialIndex >= u && this.hideTutorialTimer.start(5e3))), "up" === this.tutorialDirection && (this.tutorialY -= t * e, this.tutorialY < -l && (this.tutorialY = -l, this.tutorialDirection = "down", this.tutorialIndex += 1, this.tutorialIndex > u && (this.showTutorial = !1))), this.hideTutorialTimer || (this.hideTutorialTimer = new horde.Timer), this.nextTutorialTimer || (this.nextTutorialTimer = new horde.Timer, this.nextTutorialTimer.start(1e4)), this.hideTutorialTimer.update(e), this.nextTutorialTimer.update(e), this.hideTutorialTimer.expired() && (this.tutorialDirection = "up"), this.nextTutorialTimer.expired() && (this.nextTutorial(this.tutorialIndex + 1), this.nextTutorialTimer.reset())
    }, b.nextTutorial = function(e) {
      this.showTutorial && null === this.tutorialDirection && this.tutorialIndex === e - 1 && (this.tutorialDirection = "up")
    }, b.getTilesByRect = function(e) {
      for (var t = [], i = new horde.Vector2(e.left, e.top), s = new horde.Vector2(e.width, e.height), a = i.clone().scale(1 / this.tileSize.width).floor(), o = i.clone().add(s).scale(1 / this.tileSize.width).floor(), n = a.x; n <= o.x; n++)
        for (var r = a.y; r <= o.y; r++) t.push({
          x: n,
          y: r
        });
      return t
    }, b.checkTileCollision = function(e) {
      for (var t = this.getTilesByRect(e.boundingBox()), i = 0, s = t.length; s > i; i++) {
        var a = t[i];
        if (this.map[a.y] && 0 === this.map[a.y][a.x]) return a
      }
      return !1
    }, b.moveObject = function(e, t) {
      if (!e.badass && e.hasState(horde.Object.states.HURTING)) return !1;
      var i = e.speed;
      e.hasState(horde.Object.states.SLOWED) && (i *= .2);
      var s = i / 1e3 * t,
        a = [],
        o = !1,
        n = !1;
      if (0 !== e.direction.x && (e.position.x += e.direction.x * s, e.collidable)) {
        e.position.x < 16 && (e.position.x = 16), e.position.x + e.size.width > 624 && (e.position.x = 624 - e.size.width);
        var r = this.checkTileCollision(e);
        if (r !== !1) {
          a.push("x"), o = !0;
          var h = e.position.x + e.size.width / 2,
            d = r.x * this.tileSize.width + this.tileSize.width / 2;
          e.position.x = d > h ? r.x * this.tileSize.width - e.size.width : r.x * this.tileSize.width + this.tileSize.width
        }
      }
      if (0 !== e.direction.y && (e.position.y += e.direction.y * s, e.collidable)) {
        e.position.y + e.size.height > 400 && (e.position.y = 400 - e.size.height);
        var r = this.checkTileCollision(e);
        if (r !== !1) {
          a.push("y"), n = !0;
          var p = e.position.y + e.size.height / 2,
            c = r.y * this.tileSize.height + this.tileSize.height / 2;
          e.position.y = c > p ? r.y * this.tileSize.height - e.size.height : r.y * this.tileSize.height + this.tileSize.height
        }
      }
      if (e.collidable) {
        var l = 0;
        ("down" === this.gateState || "monster" === e.role || "hero" === e.role) && (l = w), e.direction.y < 0 && e.position.y < l && (e.position.y = l, a.push("y")), a.length > 0 && e.wallCollide(a)
      }
    }, b.dropObject = function(e, t) {
      var i = horde.makeObject(t);
      if (i.position = e.position.clone(), i.position.y -= 1, this.isSpecialLoot(t) && (i.position = new horde.Vector2(304, 226)), this.addObject(i), this.isSpecialLoot(t)) {
        var s = horde.makeObject("pickup_arrow");
        s.position = i.position.clone(), s.position.x = 320 - s.size.width / 2, s.position.y -= s.size.height + 10, this.addObject(s)
      }
    }, b.isSpecialLoot = function(e) {
      return "item_weapon_fire_sword" === e || "item_gold_chest" === e
    }, b.spawnLoot = function(e) {
      if (!(e.position.y < 44)) {
        for (var t = e.lootTable, i = t.length, s = [], a = 0; i > a; a++)
          for (var o = t[a], n = 0; n < o.weight; n++) s.push(o.type);
        var r = horde.randomRange(0, s.length - 1),
          h = s[r];
        if (null !== h) {
          var d = this.getPlayerObject();
          if ("item_food" === h && 0 === d.wounds && (h = "item_chest"), "WEAPON_DROP" === h) switch (horde.randomRange(1, 4)) {
            case 1:
              h = "item_weapon_knife";
              break;
            case 2:
              h = "item_weapon_spear";
              break;
            case 3:
              h = "item_weapon_fireball";
              break;
            case 4:
              h = "item_weapon_axe"
          }
          h.indexOf("item_weapon") >= 0 && d.hasWeapon("h_fire_sword") && (h = "item_chest"), this.dropObject(e, h)
        }
      }
    }, b.updateObjects = function(e) {
      var t = 0,
        i = 0;
      for (var s in this.objects) {
        var a = this.objects[s];
        if (a.isDead()) {
          if ("hero" === a.role) return void this.endGame();
          a.execute("onDelete", [this]), delete this.objects[a.id]
        } else {
          ("monster" === a.role || "pickup_arrow" === a.type) && (t++, a.position.y <= w && i++);
          var o = a.update(e, this);
          switch (o) {
            case "shoot":
              this.objectAttack(a)
          }
          if (a.isMoving() && !a.hasState(horde.Object.states.STUNNED) && this.moveObject(a, e), "fluff" !== a.role && "powerup_food" !== a.role && !a.hasState(horde.Object.states.DYING) && !a.hasState(horde.Object.states.INVISIBLE)) {
            for (var n in this.objects) {
              var r = this.objects[n];
              if (!(r.isDead() || r.team === a.team || "fluff" === r.role || r.hasState(horde.Object.states.DYING) || r.hasState(horde.Object.states.INVISIBLE)) && a.boundingBox().reduce(5).intersects(r.boundingBox().reduce(5))) {
                if ("hero" == a.role)
                  if ("powerup_food" == r.role) {
                    r.die(), a.wounds -= r.healAmount, a.wounds < 0 && (a.wounds = 0), a.meatEaten++, horde.sound.play("eat_food");
                    for (var h = 0; 5 > h; ++h) {
                      var d = horde.makeObject("mini_heart");
                      d.position.x = a.position.x + h * (a.size.width / 5), d.position.y = a.position.y + a.size.height - horde.randomRange(0, a.size.height), this.addObject(d)
                    }
                  } else if ("powerup_coin" == r.role) {
                  r.die(), a.gold += r.coinAmount,
                  horde.sound.play("coins"); //Aca va la magia
                  var event = {
                    "game":"RenzoGame's",
                    "player": window.playerID,
                    "value":r.coinAmount
                  };
                  window.multiplayer.send(JSON.stringify(event));
                  var p = this.coinPickup;
                  if (p.amount = r.coinAmount, p.y = 0, p.alpha = 1, p.position = r.position.clone(), p.state = "on", this.isSpecialLoot(r.type))
                    for (var h in this.objects) "pickup_arrow" === this.objects[h].type && this.objects[h].die()
                } else if ("powerup_weapon" == r.role) {
                  r.die(), a.addWeapon(r.wepType, r.wepCount), horde.sound.play("pickup_weapon");
                  var c = this.weaponPickup;
                  if (c.type = r.type, c.scale = 1, c.alpha = .9, c.position = r.position.clone(), c.state = "on", this.isSpecialLoot(r.type))
                    for (var h in this.objects) "pickup_arrow" === this.objects[h].type && this.objects[h].die()
                }
                null !== a.team && null !== r.team && a.team !== r.team && (this.dealDamage(r, a), this.dealDamage(a, r))
              }
            }
            if (this.isBadassWeapon(a) && (void 0 === a.glow && (a.glow = {
                alpha: 0,
                increment: m,
                timer: new horde.Timer
              }, a.glow.timer.start(50)), a.glow.timer.update(e), a.glow.timer.expired())) {
              a.glow.timer.reset(), a.glow.alpha += a.glow.increment;
              var l = 1 - m;
              a.glow.alpha >= l && (a.glow.alpha = l, a.glow.increment = -m);
              var u = m;
              a.glow.alpha <= u && (a.glow.alpha = u, a.glow.increment = m)
            }
          }
        }
      }
      this.monstersAlive = t, this.monstersAboveGates = i > 0;
      var g = this.getPlayerObject();
      this.woundsTo < g.wounds ? this.woundsTo += this.woundsToSpeed / 1e3 * e : this.woundsTo > g.wounds ? this.woundsTo -= this.woundsToSpeed / 1e3 * e : this.woundsTo = g.wounds;
      var b = this.getTotalScore(),
        f = Math.abs(this.scoreCount - b),
        y = horde.clamp(f, 1e3, 1e4),
        v = Math.floor(y / 1e3 * e);
      this.scoreCount < b ? (this.scoreCount += v, this.scoreCount > b && (this.scoreCount = b)) : this.scoreCount > b && (this.scoreCount -= v, this.scoreCount < b && (this.scoreCount = b)), Math.abs(g.wounds - this.woundsTo) <= 1 && (this.woundsTo = g.wounds)
    }, b.dealDamage = function(e, t) {
      if ("monster" === e.role && "projectile" === t.role)return !1;
      if (e.execute("onObjectCollide", [t, this]), "projectile" == e.role && "trap" == t.role || "trap" == e.role && "projectile" == t.role) return !1;
      var i = t.execute("onThreat", [e, this]);
      if (t.hasState(horde.Object.states.INVINCIBLE) || t.hitPoints === 1 / 0 || i === !0) return "projectile" === e.role && e.hitPoints !== 1 / 0 && ("magic" !== t.damageType && "physical" !== t.damageType || "physical" !== e.damageType ? e.die() : (e.reverseDirection(), e.deflect(), horde.sound.play("immunity"))), !1;
      //Choque de proyectiles del jugador contra proyectiles enemigos
      if (e.hitPoints !== 1 / 0 && "projectile" === e.role && "projectile" === t.role && "physical" === e.damageType && "physical" === t.damageType) return e.piercing === !1 && (e.reverseDirection(), e.deflect()),  t.piercing === !1 && (t.reverseDirection(), t.deflect()), !1;
      e.execute("onDamage", [t, this]);
      var s = e;
      if (null !== s.ownerId) {
        var a = this.objects[s.ownerId];
        a && (s = a)
      }
      //Control de choque de proyectiles
       "projectile" === e.role && s.shotsLanded++, t.wound(e.damage) ? (s.gold += t.worth, s.kills++, t.execute("onKilled", [e, this]), t.lootTable.length > 0 && this.spawnLoot(t), "projectile" === e.role && e.piercing === !1 && e.hitPoints !== 1 / 0 && e.die()) : (e.damage > 0 && "hero" === t.role && t.addState(horde.Object.states.INVINCIBLE, 2500), "projectile" === e.role && e.hitPoints !== 1 / 0 && e.die())
    }, b.updateTargetReticle = function() {
      this.targetReticle.moving = !1;
      var e = new horde.Vector2(this.mouse.mouseX, this.mouse.mouseY),
        s = new horde.Rect(32, 64, t - 64, i - 160),
        a = this.targetReticle.position;
      if (a.x !== e.x && a.y !== e.y) {
        this.targetReticle.moving = !0;
        var o = a.clone().subtract(e.clone()).abs(),
          n = horde.clamp(2 * (o.x + o.y), 1, 100);
        this.targetReticle.angle += n / 1e3 * this.lastElapsed, this.targetReticle.angle > 2 * Math.PI && (this.targetReticle.angle = 0)
      }
      a.x = e.x < s.left ? s.left : e.x > s.left + s.width ? s.left + s.width : e.x, a.y = e.y < s.top ? s.top : e.y > s.top + s.height ? s.top + s.height : e.y
    }, b.grabContinueInfo = function() {
      var e = this.getData("checkpoint_wave");
      if (null !== e && "undefined" != typeof e) {
        this.currentWaveId = e - 1;
        var t = this.getData("checkpoint_hero");
        if (null !== t) {
          var i = this.getPlayerObject();
          i.load(t), i.totalDamageTaken += i.wounds, i.wounds = 0
        }
        this.continuing = !0, this.showTutorial = !1, this.state = "intro_cinematic"
      }
    }, b.handleInput = function() {
      var e, n = this.keyboard,
        r = horde.Keyboard.Keys,
        h = horde.Mouse.Buttons,
        d = new horde.Vector2(this.mouse.mouseX, this.mouse.mouseY),
        m = !1;
      if (this.leaderboardHover = this.achievementsHover = this.loginHover = !1, "running" == this.state) {
        if (this.keyboard.isKeyPressed(r.ESCAPE) && this.showTutorial) return this.tutorialIndex = u, void this.nextTutorial(u + 1);
        if (this.keyboard.isKeyPressed(r.P) || this.keyboard.isKeyPressed(r.ESCAPE)) return this.togglePause(), void this.keyboard.clearKeys();
        if (this.paused && (m = !0), this.canMute && this.keyboard.isKeyPressed(77) && horde.sound.toggleMuted(), this.canFullscreen && this.keyboard.isKeyPressed(70) && this.toggleFullscreen(), this.keyboard.isKeyPressed(75) && (this.wasdMovesArrowsAttack = !this.wasdMovesArrowsAttack), !horde.isDemo()) {
          if (this.keyboard.historyMatch(horde.Keyboard.meatboyCode)) {
            var w = this.getPlayerObject();
            w.isMeatboy = !0, w.initMeatBoy()
          }
          if (this.keyboard.historyMatch(horde.Keyboard.godModeCode)) {
            this.keyboard.clearHistory();
            var w = this.getPlayerObject();
            w.cheater = !0, w.hasState(horde.Object.states.INVINCIBLE) ? w.removeState(horde.Object.states.INVINCIBLE) : w.addState(horde.Object.states.INVINCIBLE), horde.sound.play("code_entered")
          }
          if (this.keyboard.historyMatch(horde.Keyboard.allWeaponsCode)) {
            this.keyboard.clearHistory();
            var w = this.getPlayerObject();
            w.cheater = !0, w.weapons = [{
              type: "h_fire_sword",
              count: null
            }], horde.sound.play("code_entered")
          }
          if (this.keyboard.historyMatch(horde.Keyboard.awesmCode)) {
            this.keyboard.clearHistory();
            var w = this.getPlayerObject();
            w.cheater = !0, w.weapons = [{
              type: "h_fire_knife",
              count: null
            }], horde.sound.play("code_entered")
          }
          if (this.keyboard.historyMatch(horde.Keyboard.bombCode)) {
            this.keyboard.clearHistory();
            var w = this.getPlayerObject();
            w.cheater = !0, w.weapons = [{
              type: "h_firebomb",
              count: null
            }], horde.sound.play("code_entered")
          }
          if (this.keyboard.historyMatch(horde.Keyboard.debugCode) && (this.keyboard.clearHistory(), this.debug = !this.debug, horde.sound.play("code_entered")), this.keyboard.historyMatch(horde.Keyboard.resetCode) && (this.keyboard.clearHistory(), this.clearData("checkpoint_wave"), this.clearData("checkpoint_hero"), this.putData(o, a), horde.sound.play("code_entered")), this.keyboard.historyMatch(horde.Keyboard.cyclopsCode)) {
            var w = this.getPlayerObject();
            w.cheater || (horde.sound.play("code_entered"), this.keyboard.clearHistory(), w.cheater = !0, w.hitPoints *= 2, w.size = new horde.Size(64, 64), w.spriteY = 224, w.weapons = [{
              type: "e_boulder",
              count: null
            }], w.wounds *= 2)
          }
        }
        if (this.paused) {
          var g = this.pointerYStart - 22;
          if (this.verifyQuit ? (d.x >= c && d.x <= c + 192 && d.y > g && d.y < g + (p - 1) && (this.mouse.hasMoved && 0 !== this.pointerY && (e = 0), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), d.x >= c && d.x <= c + 192 && d.y > g + p && d.y < g + p + 36 && (this.mouse.hasMoved && 1 !== this.pointerY && (e = 1), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0))) : (d.x >= c && d.x <= c + 106 && d.y > g && d.y < g + (p - 1) && (this.mouse.hasMoved && 0 !== this.pointerY && (e = 0), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), d.x >= c && d.x <= c + 106 && d.y > g + p && d.y < g + p + 36 && (this.mouse.hasMoved && 1 !== this.pointerY && (e = 1), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0))), n.isKeyPressed(r.ENTER) || n.isKeyPressed(r.SPACE)) switch (n.clearKey(r.ENTER), n.clearKey(r.SPACE), this.mouse.clearButtons(), this.pointerY) {
            case 0:
              this.togglePause();
              break;
            case 1:
              if (horde.sound.play("select_pointer"), this.verifyQuit) {
                this.verifyQuit = !1, this.togglePause();
                var w = this.getPlayerObject();
                w.wound(100)
              } else this.pointerY = 0, this.verifyQuit = !0
          }
        }
      }
      if ("title" === this.state) {
        if (m = !0, !this.konamiEntered && this.keyboard.historyMatch(horde.Keyboard.konamiCode)) {
          horde.sound.play("code_entered"), this.konamiEntered = !0;
          var w = this.getPlayerObject();
          w.cheater = !0, w.hitPoints *= 3
        }
        var b = c - 40,
          f = c + 130,
          g = this.pointerYStart - 22;
        if ((horde.isDemo() || this.canContinue()) && d.x >= b && d.x <= f && d.y >= g && d.y < g + 20 && (this.mouse.hasMoved && 0 !== this.pointerY && (e = 0), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), g += p, d.x >= b && d.x <= f && d.y >= g && d.y < g + 20 && (this.mouse.hasMoved && 1 !== this.pointerY && (e = 1), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), g += p, d.x >= b && d.x <= f && d.y >= g && d.y < g + 20 && (this.mouse.hasMoved && 2 !== this.pointerY && (e = 2), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), n.isKeyPressed(r.ENTER) || n.isKeyPressed(r.SPACE)) switch (horde.sound.play("select_pointer"), n.clearKey(r.ENTER), n.clearKey(r.SPACE), this.mouse.clearButtons(), this.pointerY) {
          case 0:
            horde.isDemo() ? location.href = s : this.grabContinueInfo();
            break;
          case 1:
            this.continuing = !1, this.showTutorial = !this.touchMove, this.state = "intro_cinematic";
            break;
          case 2:
            this.state = "credits"
        }
      }
      if ("buy_now" == this.state) {
        m = !0;
        var g = this.pointerYStart - 22;
        if (d.x >= c && d.x <= c + 106 && d.y > g && d.y < g + (p - 1) && (this.mouse.hasMoved && 0 !== this.pointerY && (e = 0), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), d.x >= c && d.x <= c + 106 && d.y > g + p && d.y < g + p + 36 && (this.mouse.hasMoved && 1 !== this.pointerY && (e = 1), this.mouse.isButtonDown(h.LEFT) && (this.keyboard.keyStates[r.SPACE] = !0)), n.isKeyPressed(r.ENTER) || n.isKeyPressed(r.SPACE)) switch (n.clearKey(r.ENTER), n.clearKey(r.SPACE), this.mouse.clearButtons(), horde.sound.play("select_pointer"), this.pointerY) {
          case 0:
            location.href = s;
            break;
          case 1:
            horde.sound.stop("victory"), this.initGame()
        }
      }
      if ("credits" === this.state && (this.keyboard.isAnyKeyPressed() || this.mouse.isAnyButtonDown()) && (n.clearKeys(), this.mouse.clearButtons(), this.state = "title"), "intro_cinematic" === this.state && (this.keyboard.isAnyKeyPressed() || this.mouse.isAnyButtonDown())) {
        n.clearKeys(), this.mouse.clearButtons(), this.state = "running";
        var y = this.getPlayerObject();
        this.woundsTo = y.wounds, this.currentMusic = "normal_battle_music", horde.sound.play(this.currentMusic)
      }
      if (m && ((this.keyboard.isKeyPressed(r.W) || this.keyboard.isKeyPressed(r.UP)) && (this.keyboard.keyStates[r.W] = !1, this.keyboard.keyStates[r.UP] = !1, this.pointerY--, this.pointerY < this.pointerOptionsStart && (this.pointerY = this.maxPointerY), horde.sound.play("move_pointer")), (this.keyboard.isKeyPressed(r.S) || this.keyboard.isKeyPressed(r.DOWN)) && (this.keyboard.keyStates[r.S] = !1, this.keyboard.keyStates[r.DOWN] = !1, this.pointerY++, this.pointerY > this.maxPointerY && (this.pointerY = this.pointerOptionsStart), horde.sound.play("move_pointer")), this.keyboard.storeKeyStates(), void 0 !== e && (horde.sound.play("move_pointer"), this.pointerY = e)), "running" === this.state) {
        var y = this.getPlayerObject();
        if (this.paused || y.hasState(horde.Object.states.DYING)) return void this.keyboard.storeKeyStates();
        if (this.touchMove) {
          if (this.targetReticle.angle += 2 * Math.PI / 5e3 * this.lastElapsed, this.targetReticle.angle > 2 * Math.PI && (this.targetReticle.angle = 0), this.mouse.wasButtonClicked(h.LEFT) || this.mouse.isButtonDown(h.LEFT)) {
            var v = new horde.Rect(48, 80, t - 96, i - 192),
              S = this.targetReticle.position;
            S.x = d.x < v.left ? v.left : d.x > v.left + v.width ? v.left + v.width : d.x, S.y = d.y < v.top ? v.top : d.y > v.top + v.height ? v.top + v.height : d.y
          }
        } else this.updateTargetReticle();
        var I = new horde.Vector2,
          T = new horde.Vector2;
        if (this.touchMove) {
          var j = this.getNearestHostile(y);
          null !== j && (T = j.boundingBox().center().subtract(y.boundingBox().center()).normalize()), I = this.targetReticle.position.clone().subtract(y.boundingBox().center()).normalize();
          var _ = this.targetReticle.position.clone().subtract(y.boundingBox().center()).magnitude();
          3 > _ && I.zero()
        } else {
          if (this.wasdMovesArrowsAttack) var P = {
            moveUp: r.W,
            moveLeft: r.A,
            moveDown: r.S,
            moveRight: r.D,
            attackUp: r.UP,
            attackDown: r.DOWN,
            attackLeft: r.LEFT,
            attackRight: r.RIGHT
          };
          else var P = {
            moveUp: r.UP,
            moveDown: r.DOWN,
            moveLeft: r.LEFT,
            moveRight: r.RIGHT,
            attackUp: r.W,
            attackLeft: r.A,
            attackDown: r.S,
            attackRight: r.D
          };
          n.isKeyDown(P.moveUp) && (I.y = -1, this.nextTutorial(1)), n.isKeyDown(P.moveLeft) && (I.x = -1, this.nextTutorial(1)), n.isKeyDown(P.moveDown) && (I.y = 1, this.nextTutorial(1)), n.isKeyDown(P.moveRight) && (I.x = 1, this.nextTutorial(1)), n.isKeyDown(P.attackUp) && (T.y = -1, this.nextTutorial(2)), n.isKeyDown(P.attackDown) && (T.y = 1, this.nextTutorial(2)), n.isKeyDown(P.attackLeft) && (T.x = -1, this.nextTutorial(2)), n.isKeyDown(P.attackRight) && (T.x = 1, this.nextTutorial(2))
        }
        if (y.stopMoving(), (0 !== I.x || 0 !== I.y) && y.setDirection(I), this.mouse.wasButtonClicked(h.LEFT) && (this.showTutorial && d.y <= l + this.tutorialY ? (this.tutorialIndex = u, this.nextTutorial(u + 1), this.mouse.clearButtons()) : d.x >= 604 && d.x <= 636 && d.y >= 442 && d.y <= 475 ? this.canFullscreen ? (this.toggleFullscreen(), this.mouse.clearButtons()) : this.togglePause() : this.canMute && d.x >= 570 && d.x <= 602 && d.y >= 442 && d.y <= 484 && (horde.sound.toggleMuted(), this.mouse.clearButtons())), this.mouse.isButtonDown(h.LEFT) && !this.touchMove) {
          var O = this.targetReticle.position.clone().subtract(y.boundingBox().center()).normalize();
          this.objectAttack(y, O), this.heroFiring = !0, this.heroFiringDirection = O, this.nextTutorial(4), this.showReticle = !0
        } else 0 !== T.x || 0 !== T.y ? (this.objectAttack(y, T), this.heroFiring = !0, this.heroFiringDirection = T) : (this.heroFiring = !1, this.heroFiringDirection = null);
        this.keyboard.storeKeyStates(), this.mouse.storeButtonStates()
      }
    }, b.getNearestHostile = function(e) {
      var t = {
        obj: null,
        distance: 1 / 0
      };
      for (var i in this.objects) {
        var s = this.objects[i];
        if (s.team != e.team && ("monster" == s.role || "projectile" == s.role) && s.hitPoints !== 1 / 0 && this.isAlive(s.id) && !s.hasState(horde.Object.states.INVINCIBLE) && !s.hasState(horde.Object.states.INVISIBLE)) {
          var a = e.boundingBox().center().subtract(s.boundingBox().center()).magnitude();
          a < t.distance && (t.obj = s, t.distance = a)
        }
      }
      return null === t.obj ? null : t.obj
    }, b.objectAttack = function(e, t) {
      t || (t = e.facing);
      var i = e.fireWeapon();
      if (i !== !1) {
        var s = horde.objectTypes[i];
        switch (i) {
          case "e_minotaur_trident":
            for (var a = t.heading(), o = -.5; .5 >= o; o += .5) this.spawnObject(e, i, horde.Vector2.fromHeading(a + o));
            e.shotsFired += 3;
            break;
          case "h_knife":
          case "h_fire_knife":
            var a = t.heading();
            this.spawnObject(e, i, horde.Vector2.fromHeading(a - .1)), this.spawnObject(e, i, horde.Vector2.fromHeading(a + .1)), e.shotsFired += 2;
            break;
          case "e_fireball_green":
            for (var o = -.25; .25 >= o; o += .25) {
              var a = t.heading();
              a += o + horde.randomRange(-1, 1) / 10, this.spawnObject(e, i, horde.Vector2.fromHeading(a))
            }
            e.shotsFired += 3;
            break;
          case "h_fireball":
            var a = t.heading(),
              n = horde.Vector2.fromHeading(a),
              r = this.spawnObject(e, i, n.clone()),
              h = this.objects[r];
            h.position.add(horde.Vector2.fromHeading(a - Math.PI / 2).scale(16)), h.position.add(n.clone().scale(16));
            var r = this.spawnObject(e, i, n.clone()),
              h = this.objects[r];
            h.position.add(n.clone().scale(32));
            var r = this.spawnObject(e, i, n.clone()),
              h = this.objects[r];
            h.position.add(horde.Vector2.fromHeading(a + Math.PI / 2).scale(16)), h.position.add(n.clone().scale(16)), e.shotsFired += 3;
            break;
          case "h_firebomb":
            for (var d = this.targetReticle.position.clone(), p = 2 * Math.PI, c = p / 20, a = 0; p > a; a += c) {
              var h = horde.makeObject("h_fireball");
              h.position.x = d.x - 16, h.position.y = d.y - 16, h.setDirection(horde.Vector2.fromHeading(a)), h.ownerId = e.id, h.team = e.team, this.addObject(h), e.shotsFired += 1
            }
            break;
          case "e_ring_fire":
            for (var p = 2 * Math.PI, c = p / 10, l = c / 2, a = l; p + l > a; a += c) this.spawnObject(e, i, horde.Vector2.fromHeading(a));
            break;
          case "e_ring_fire_dopp":
            for (var p = 2 * Math.PI, c = p / 10, a = 0; p > a; a += c) this.spawnObject(e, i, horde.Vector2.fromHeading(a));
            break;
          case "e_bouncing_boulder":
            for (var p = 2 * Math.PI, c = p / 8, a = 0; p > a; a += c) this.spawnObject(e, i, horde.Vector2.fromHeading(a));
            break;
          default:
            this.spawnObject(e, i, t), e.shotsFired++
        }
        e.shotsPerWeapon[i] || (e.shotsPerWeapon[i] = 0), e.shotsPerWeapon[i]++;
        var u = null;
        s.soundAttacks ? u = s.soundAttacks : e.soundAttacks && (u = e.soundAttacks), null !== u && horde.sound.play(u)
      }
    }, b.render = function() {
      var e = this.canvases.display.getContext("2d");
      switch (this.state) {
        case "intro":
          this.drawLogo(e);
          break;
        case "title":
          this.drawTitle(e), this.drawPointer(e), this.drawTitlePointerOptions(e);
          break;
        case "credits":
          this.drawTitle(e), this.drawCredits(e);
          break;
        case "intro_cinematic":
          this.drawIntroCinematic(e);
          break;
        case "running":
          this.drawFloor(e), this.wonGame || this.drawTargetReticle(e), this.drawObjects(e), this.drawFauxGates(e), this.drawWalls(e), this.drawWeaponPickup(e), this.drawCoinPickup(e), this.drawWaveText(e), this.drawUI(e), this.paused && (this.drawPaused(e), this.drawPointer(e), this.drawPausedPointerOptions(e)), this.showTutorial && this.drawTutorial(e);
          break;
        case "game_over":
          this.drawGameOver(e);
          break;
        case "buy_now":
          this.drawBuyNow(e), this.drawPointer(e)
      }
      this.debug === !0 && this.drawDebugInfo(e)
    }, b.drawWeaponPickup = function(e) {
      var t = this.weaponPickup;
      if ("on" === t.state) {
        var i = horde.makeObject(t.type);
        e.save(), e.translate(t.position.x + i.size.width / 2, t.position.y + i.size.height / 2), e.globalAlpha = t.alpha, e.drawImage(this.images.getImage("objects"), 128, 192, 48, 48, -22 * t.scale, -20 * t.scale, 48 * t.scale, 48 * t.scale), e.drawImage(this.images.getImage(i.spriteSheet), i.spriteX, i.spriteY + 1, i.size.width - 1, i.size.height - 1, -(i.size.width / 2 * t.scale), -(i.size.height / 2 * t.scale), i.size.width * t.scale, i.size.height * t.scale), e.restore()
      }
    }, b.drawCoinPickup = function(e) {
      var t = this.coinPickup;
      if ("on" === t.state) {
        var i = this.getCoinFontData(t.amount),
          s = "+" + t.amount;
        e.save(), e.fillStyle = i.fillStyle, e.font = "Bold " + i.size + "px MedievalSharp", e.lineWidth = 2, e.strokeStyle = n, e.textAlign = "center", e.textBaseline = "top", e.translate(t.position.x, t.position.y), e.globalAlpha = t.alpha, e.strokeText(s, 0, 0), e.fillText(s, 0, 0), e.restore()
      }
    }, b.getCoinFontData = function(e) {
      return 100 == e ? {
        fillStyle: "rgb(255, 203, 5)",
        size: 24
      } : 500 == e ? {
        fillStyle: "rgb(255, 244, 96)",
        size: 36
      } : {
        fillStyle: "rgb(255, 248, 160)",
        size: 50
      }
    }, b.drawWaveText = function(e) {
      if ("off" != this.waveText.state) {
        var s = parseInt(this.waveText.size),
          a = this.waveText.width * s,
          o = h * s,
          n = t / 2 - a / 2,
          r = i / 2 - o / 2;
        e.save(), e.globalAlpha = this.waveText.alpha, e.drawImage(this.canvases.waveText, 0, 0, this.waveText.width, h, n, r, a, o), e.restore();

      }
    }, b.drawGameOver = function(e) {
      if (this.goAlphaStep ? (this.goAlpha += this.goAlphaStep, this.goAlpha <= 0 && (this.goAlpha = 0, this.goAlphaStep = .025), this.goAlpha >= 1 && (this.goAlpha = 1, this.goAlphaStep = -.025)) : (this.goAlphaStep = -.025, this.goAlpha = 1), this.gameOverBg || (this.drawUI(e), this.gameOverBg = e.getImageData(0, 0, this.view.width, this.view.height)), e.putImageData(this.gameOverBg, 0, 0), e.save(), e.globalAlpha = this.gameOverAlpha, e.fillStyle = this.wonGame ? n : "rgb(215, 25, 32)", e.fillRect(0, 0, this.view.width, this.view.height), e.restore(), this.gameOverReady === !0) {
        if ((this.keyboard.isAnyKeyPressed() || this.mouse.isAnyButtonDown()) && (this.keyboard.clearKeys(), this.mouse.clearButtons(), this.statsIndex += 1, this.statsIndex >= 5)) return void(horde.isDemo() ? (this.state = "buy_now", this.initOptions()) : (horde.sound.stop("victory"), this.initGame()));
        var t = 70;
        e.drawImage(this.preloader.getImage("ui"), 0, 2322, 564, 404, 38, 38, 564, 404), this.wonGame ? e.drawImage(this.preloader.getImage("ui"), 564, 2444, 256, 50, 192, t, 256, 50) : this.gotNewHighScore ? e.drawImage(this.preloader.getImage("ui"), 564, 2374, 404, 50, 119, t, 404, 50) : e.drawImage(this.preloader.getImage("ui"), 564, 2324, 218, 50, 211, t, 218, 50), this.drawObjectStats(this.getPlayerObject(), e), this.statsIndex >= 4 && e.drawImage(this.preloader.getImage("ui"), 564, 2424, 334, 20, 153, 404, 334, 20)
      }
    }, b.drawBuyNow = function(e) {
      e.save(), e.globalAlpha = d, e.fillRect(0, 0, this.view.width, this.view.height), e.globalAlpha = 1, e.drawImage(this.preloader.getImage("ui"), 370, 0, 564, 404, 38, 38, 564, 404), e.restore();
      var t, i = this.pointerYStart - 22;
      t = 0 == this.pointerY ? 260 : 0, e.drawImage(this.preloader.getImage("ui"), t, 2122, 200, 40, c, i, 200, 40), t = 1 == this.pointerY ? 260 : 0, i += p, e.drawImage(this.preloader.getImage("ui"), t, 2182, 200, 40, c, i, 200, 40)
    }, b.drawObjectStats = function(e, t) {
      var i = 350,
        s = 55;
      t.save(), t.font = "Bold 40px MedievalSharp";
      var a, o = 0,
        n = 0,
        r = this.currentWaveId;
      this.wonGame && (r += 1);
      var h = 0;
      0 === this.statsIndex ? (h = this.statsCount, o = r, a = 199, n = 10) : h = r, t.fillStyle = "rgb(199, 234, 251)", t.fillText(h + " x 1000", i, 182);
      var d = 0;
      1 === this.statsIndex ? (d = this.statsCount, o = e.gold, a = 10, n = 10) : this.statsIndex > 1 && (d = e.gold), t.fillStyle = "rgb(255, 245, 121)", t.fillText(d, i, 180 + s);
      var p = 0;
      2 === this.statsIndex ? (p = this.statsCount, o = e.totalDamageTaken, a = 299, n = 5) : this.statsIndex > 2 && (p = e.totalDamageTaken), t.fillStyle = "rgb(237, 28, 36)", t.fillText("-" + p + " x 10", i, 180 + 2 * s);
      var c = "",
        l = this.getTotalScore();
      3 === this.statsIndex ? (c = this.statsCount, o = l) : this.statsIndex > 3 && (c = l), t.fillStyle = "rgb(250, 166, 26)", t.fillText(c, i, 184 + 3 * s), this.statsCount >= o && (this.statsCount = 0, this.statsIncrement = a, this.statsIndex += 1, this.statsTimer.start(n)), t.restore()
    }, b.getTotalScore = function() {
      var e = this.getPlayerObject(),
        t = this.currentWaveId;
      this.wonGame && (t += 1);
      var i = 1e3 * t;
      return i += e.gold, i -= 10 * e.totalDamageTaken, e.cheater === !0 && (i /= 2), 0 > i && (i = 0), i
    }, b.drawLogo = function(e) {
      e.save(), e.fillStyle = n, e.fillRect(0, 0, this.view.width, this.view.height), e.restore(), this.logoAlpha > 0 && (e.save(), e.globalAlpha = this.logoAlpha, e.drawImage(this.preloader.getImage("ui"), 0, 0, 370, 430, 160, 0, 370, 430), e.restore())
    }, b.drawFloor = function(e) {
      var t = this.getArenaOffset();
      e.drawImage(this.images.getImage("arena"), t + 32, 480, 576, 386, 32, 0, 576, 386)
    }, b.drawWalls = function(e) {
      var s = this.getArenaOffset();
      e.drawImage(this.images.getImage("arena"), s, 0, t, i, 0, 0, this.view.width, this.view.height)
    }, b.getArenaOffset = function() {
      var e = this.currentWaveId >= 0 ? this.currentWaveId : 0;
      return t * Math.floor(e / 10)
    }, b.drawPaused = function(e) {
      e.save(), e.globalAlpha = d, e.fillRect(0, 0, this.view.width, this.view.height), e.globalAlpha = 1, e.drawImage(this.preloader.getImage("ui"), 0, 1718, 564, 404, 38, 38, 564, 404);
      var t = this.getPlayerObject();
      e.font = "Bold 36px MedievalSharp", e.textAlign = "left", e.fillStyle = "rgb(237, 28, 36)", e.fillText(t.kills, 390, 164), e.fillStyle = "rgb(145, 102, 0)", e.fillText(t.meatEaten, 390, 216), e.fillStyle = "rgb(199, 234, 251)", e.fillText(t.shotsFired, 390, 270), e.fillStyle = "rgb(250, 166, 26)", e.fillText(this.getAccuracy(t) + "%", 390, 324), e.restore()
    }, b.getAccuracy = function(e) {
      return 0 === e.shotsFired ? 0 : Math.round(e.shotsLanded / e.shotsFired * 100)
    }, b.drawTutorial = function(e) {
      //Submenu al inicio del nuevo juego
      if (!this.paused) {
        e.save(), e.globalAlpha = d, e.fillRect(0, this.tutorialY, this.view.width, l), e.globalAlpha = 1, e.font = "Bold 22px MedievalSharp", e.textAlign = "center";
        var t = ["MOVE with the WASD keys.", "ATTACK with the ARROW keys.", "Or use the MOUSE to AIM with the target reticle.", "ATTACK by HOLDING DOWN the LEFT MOUSE BUTTON.", "KILL MONSTERS and COLLECT GOLD to raise your score!"];
        e.fillStyle = n, e.fillText(t[this.tutorialIndex], 322, this.tutorialY + 36), e.fillStyle = "rgb(230, 230, 230)", e.fillText(t[this.tutorialIndex], 320, this.tutorialY + 34), e.font = "20px MedievalSharp";
        var i = "Press here or ESC to skip";
        e.fillStyle = n, e.fillText(i, 322, this.tutorialY + 62), e.fillStyle = "rgb(118, 151, 183)", e.fillText(i, 320, this.tutorialY + 60), e.restore()
      }
    }, b.getObjectDrawOrder = function() {
      var e = [];
      for (var t in this.objects) {
        var i = this.objects[t];
        e.push({
          id: i.id,
          drawIndex: i.drawIndex,
          y: i.position.y + i.size.height
        })
      }
      return e.sort(function(e, t) {
        return e.drawIndex === t.drawIndex ? e.y - t.y : e.drawIndex - t.drawIndex
      }), e
    }, b.drawObject = function(e, t) {
      if ("hero" === t.role && this.heroFiring) var i = t.getSpriteXY(this.heroFiringDirection);
      else var i = t.getSpriteXY();
      if (!(t.alpha <= 0 || t.hasState(horde.Object.states.INVISIBLE))) {
        if (e.save(), e.translate(t.position.x + t.size.width / 2, t.position.y + t.size.height / 2), 0 !== t.angle && e.rotate(t.angle * Math.PI / 180), 1 !== t.alpha && (e.globalAlpha = t.alpha), "powerup_weapon" === t.role && e.drawImage(this.images.getImage("objects"), 128, 192, 48, 48, -22, -20, 48, 48), e.drawImage(this.images.getImage(t.spriteSheet), i.x, i.y + 1, t.size.width - 1, t.size.height - 1, -(t.size.width / 2), -(t.size.height / 2), t.size.width, t.size.height), t.spriteYOverlay) {
          e.save();
          var s = 1 - t.wounds / t.hitPoints + .3;
          e.globalAlpha = s, e.drawImage(this.images.getImage(t.spriteSheet), i.x, t.spriteYOverlay + 1, t.size.width - 1, t.size.height - 1, -(t.size.width / 2), -(t.size.height / 2), t.size.width, t.size.height), e.restore()
        }
        if ("monster" === t.role && t.badass && t.hasState(horde.Object.states.HURTING) && this.drawImageOverlay(e, this.images.getImage(t.spriteSheet), i.x, i.y + 1, t.size.width - 1, t.size.height - 1, -(t.size.width / 2), -(t.size.height / 2), t.size.width, t.size.height, "rgba(186, 51, 35, 0.6)"), this.isBadassWeapon(t) && t.glow && this.drawImageOverlay(e, this.images.getImage(t.spriteSheet), i.x, i.y + 1, t.size.width - 1, t.size.height - 1, -(t.size.width / 2), -(t.size.height / 2), t.size.width, t.size.height, "rgba(255, 247, 143, " + t.glow.alpha + ")"), this.debug && "monster" === t.role || t.badass && !t.hasState(horde.Object.states.DYING)) {
          //Espacio del Ciclope
          var a = t.size.width - 2,
            o = 8,
            h = a - Math.round(a * t.wounds / t.hitPoints);
          e.fillStyle = r, e.fillRect(-(t.size.width / 2), t.size.height / 2, t.size.width, o), e.fillStyle = n, e.fillRect(-(t.size.width / 2) + 1, t.size.height / 2 + 1, t.size.width - 2, o - 2), e.fillStyle = this.getBarColor(t.hitPoints, t.hitPoints - t.wounds), e.fillRect(-(t.size.width / 2) + 1, t.size.height / 2 + 1, h, o - 2)
        }
        e.restore()
      }
    }, b.isBadassWeapon = function(e) {
      return "projectile" === e.role && e.hitPoints === 1 / 0 && 1 === e.team && "e_fireball" != e.type && "e_static_blue_fire" != e.type && "e_static_green_fire" != e.type
    }, b.drawObjects = function(e) {
      var t = this.getObjectDrawOrder();
      for (var i in t) {
        var s = this.objects[t[i].id];
        this.drawObject(e, s)
      }
    }, b.drawTargetReticle = function(e) {
      this.showReticle && (e.save(), e.globalAlpha = .75, e.translate(this.targetReticle.position.x, this.targetReticle.position.y), e.rotate(this.targetReticle.angle), e.drawImage(this.images.getImage("objects"), 256, 192, 64, 64, -32, -32, 64, 64), e.restore())
    }, b.drawImageOverlay = function(e, s, a, o, n, r, h, d, p, c, l) {
      var u = this.canvases.buffer.getContext("2d");
      u.save(), u.clearRect(0, 0, t, i), u.drawImage(s, a, o, n, r, 0, 0, p, c), u.globalCompositeOperation = "source-in", u.fillStyle = l, u.fillRect(0, 0, p, c), u.restore(), e.drawImage(this.canvases.buffer, 0, 0, p, c, h, d, p, c)
    }, b.drawUI = function(e) {
      var t = this.getPlayerObject(),
        i = t.getWeaponInfo(),
        s = horde.objectTypes[i.type],
        a = i.count ? i.count : "";
      if (e.drawImage(this.images.getImage("objects"), s.spriteX, s.spriteY, 32, 32, 4, 412, 32, 32), e.drawImage(this.images.getImage("objects"), 32, 32, 32, 32, 4, 442, 32, 32), e.save(), e.textAlign = "left", e.font = "Bold 32px MedievalSharp", e.globalAlpha = .75, e.fillStyle = n, e.fillText(a, 48, 444), e.fillText(this.scoreCount, 48, 474), e.globalAlpha = 1, e.fillStyle = r, e.fillText(a, 46, 440), e.fillText(this.scoreCount, 46, 472), e.restore(), t.hitPoints > 1) {
        var o = {
            width: 280,
            height: 24,
            x: 212,
            y: 432
          },
          h = o.width - Math.round(o.width * t.wounds / t.hitPoints),
          d = o.width - Math.round(o.width * this.woundsTo / t.hitPoints);
        if (this.woundsTo < t.wounds) var p = h,
          c = d;
        else var p = d,
          c = h;
        e.save(), e.fillStyle = r, e.fillRect(o.x - 2, o.y - 2, o.width + 2, o.height + 4), e.fillRect(o.x + o.width, o.y, 2, o.height), e.fillStyle = n, e.fillRect(o.x, o.y, o.width, o.height), e.fillStyle = this.getBarColor(t.hitPoints, t.hitPoints - t.wounds), e.globalAlpha = .4, e.fillRect(o.x, o.y, c, o.height), e.fillRect(o.x, o.y, p, o.height), e.fillRect(o.x, o.y + 5, p, o.height - 10), e.fillRect(o.x, o.y + 10, p, o.height - 20), e.restore();
        var l = (t.hitPoints - t.wounds) / t.hitPoints * 100,
          u = 352;
        l > 50 ? u = 224 : l > 25 && (u = 288), e.drawImage(this.images.getImage("objects"), u, 64, 42, 42, o.x - 32, 424, 42, 42)
      }
      if (this.canMute && e.drawImage(this.preloader.getImage("ui"), horde.sound.isMuted() ? 692 : 660, 910, 32, 32, 570, 442, 32, 32), this.canFullscreen) {
        var u = this.enableFullscreen ? 596 : 564;
        e.drawImage(this.preloader.getImage("ui"), u, 910, 32, 32, 604, 442, 32, 32)
      } else e.drawImage(this.preloader.getImage("ui"), 628, 910, 32, 32, 604, 442, 32, 32)
    }, b.drawTitle = function(t) {
      var i = "rgb(230, 230, 230)";
      t.drawImage(this.preloader.getImage("ui"), 0, 430, 640, 480, 0, 0, 640, 480);
      var s = "High Score: " + this.getData(o);
      t.save(), t.font = "Bold 24px MedievalSharp", t.textAlign = "center", t.fillStyle = n, t.fillText(s, 322, 444), t.fillStyle = i, t.fillText(s, 320, 442), t.restore();
      var a = "v" + e;
      horde.isDemo() && (a += " demo"), t.save(), t.font = "Bold 14px Monospace", t.textAlign = "right", t.fillStyle = n, t.fillText(a, 638, 480), t.fillStyle = i, t.fillText(a, 636, 478), t.restore();
      var r = "Lost Decade Games";
      t.save(), t.font = "Bold 14px Monospace", t.fillStyle = n, t.fillText(r, 6, 462), t.fillStyle = i, t.fillText(r, 4, 460), t.restore();
      var h = "?? 2010";
      t.save(), t.font = "Bold 14px Monospace", t.fillStyle = n, t.fillText(h, 6, 478), t.fillStyle = i, t.fillText(h, 4, 476), t.restore()
    }, b.drawPointer = function(e) {
      var t = (this.pointerYStart - 18, c - 42),
        i = this.pointerYStart + this.pointerY * p - p;
      e.save(), e.drawImage(this.images.getImage("objects"), 320, 192, 36, 26, t, i, 36, 26), e.restore()
    }, b.canContinue = function() {
      var e = this.getData("checkpoint_wave");
      return Boolean(e)
    }, b.drawTitlePointerOptions = function(e) {
      var t, i = this.pointerYStart - 22;
      horde.isDemo() ? (t = 0 == this.pointerY ? 638 : 430, e.drawImage(this.preloader.getImage("ui"), 800, t, 128, 26, c, i, 128, 26)) : (t = this.canContinue() ? 0 == this.pointerY ? 638 : 430 : 534, e.drawImage(this.preloader.getImage("ui"), 640, t, 116, 20, c, i, 116, 20)), t = 1 == this.pointerY ? 664 : 456, e.drawImage(this.preloader.getImage("ui"), 640, t, 132, 26, c, i + p, 132, 26), t = 2 == this.pointerY ? 690 : 482, e.drawImage(this.preloader.getImage("ui"), 640, t, 90, 22, c, i + 2 * p, 90, 22)
    }, b.drawPausedPointerOptions = function(e) {
      var t, i = this.pointerYStart - 22;
      this.verifyQuit ? (t = 0 == this.pointerY ? 1932 : 1860, e.drawImage(this.preloader.getImage("ui"), 564, t, 158, 26, c, i, 158, 26)) : (t = 0 == this.pointerY ? 1788 : 1718, e.drawImage(this.preloader.getImage("ui"), 564, t, 106, 26, c, i, 106, 26)), this.verifyQuit ? (t = 1 == this.pointerY ? 1966 : 1894, e.drawImage(this.preloader.getImage("ui"), 564, t, 192, 32, c, i + p, 196, 32)) : (t = 1 == this.pointerY ? 1822 : 1752, e.drawImage(this.preloader.getImage("ui"), 564, t, 70, 36, c, i + p, 70, 36))
    }, b.initOptions = function() {
      switch (this.state) {
        case "title":
          this.pointerYStart = 314, horde.isDemo() || this.canContinue() ? (this.pointerY = 0, this.pointerOptionsStart = 0) : (this.pointerY = 1, this.pointerOptionsStart = 1), this.maxPointerY = 2;
          break;
        case "running":
          this.pointerYStart = 378, this.pointerY = 0, this.maxPointerY = 1, this.pointerOptionsStart = 0, this.verifyQuit = !1;
          break;
        case "buy_now":
          this.pointerYStart = 378, this.pointerY = 0, this.maxPointerY = 1, this.pointerOptionsStart = 0
      }
    }, b.drawCredits = function(e) {
      e.save(), e.globalAlpha = d, e.fillRect(0, 0, this.view.width, this.view.height), e.globalAlpha = 1, e.drawImage(this.preloader.getImage("ui"), 0, 1314, 564, 404, 38, 38, 564, 404), e.restore()
    }, b.drawIntroCinematic = function(e) {
      switch (this.introPhase) {
        case 0:
          this.introFadeOutBg || (this.introFadeOutBg = e.getImageData(0, 0, this.view.width, this.view.height), this.introFadeAlpha = 0), e.fillStyle = n, e.fillRect(0, 0, t, i), e.save(), e.putImageData(this.introFadeOutBg, 0, 0), e.restore(), this.introFadeAlpha > 0 && (e.save(), e.globalAlpha = this.introFadeAlpha, e.fillStyle = n, e.fillRect(0, 0, t, i), e.restore());
          break;
        case 1:
          this.drawFloor(e), this.drawFauxGates(e), this.drawWalls(e), this.introFadeAlpha > 0 && (e.save(), e.globalAlpha = this.introFadeAlpha, e.fillStyle = n, e.fillRect(0, 0, t, i), e.restore());
          break;
        case 2:
        case 3:
          this.drawFloor(e), this.drawFauxGates(e), this.drawWalls(e);
          break;
        case 4:
        case 5:
        case 9:
          this.drawFloor(e), this.introHero && this.drawObject(e, this.introHero), this.drawFauxGates(e), this.drawWalls(e);
          break;
        case 6:
        case 7:
        case 8:
          this.drawFloor(e), e.drawImage(this.images.getImage("characters"), 640, 0, 32, 32, 304, 224, 32, 32), this.drawFauxGates(e), this.drawWalls(e)
      }
    }, b.drawFauxGates = function(e) {
      for (var t = 0; g > t; t++) {
        var i = 0,
          s = 192;
        t > 0 && (i = 320, s = 1 == t ? 288 : 352), e.drawImage(this.images.getImage("objects"), i, s, 64, 64, this.gatesX + 96 + 192 * t, this.gatesY, 64, 64)
      }
    }, b.drawDebugInfo = function(e) {
      e.save(), e.fillStyle = "rgba(0, 0, 0, 0.3)", e.fillRect(0, 0, this.view.width, 30), e.restore(), e.save(), e.fillStyle = r, e.font = "Bold 20px Monospace", e.fillText("Elapsed: " + this.lastElapsed, 10, 20), e.textAlign = "right", e.fillText(Math.round(1e3 / this.lastElapsed) + " FPS", 630, 20), e.restore()
    }, b.getData = function(e) {
      return window.localStorage && window.localStorage.getItem ? window.localStorage.getItem(e) : void 0
    }, b.putData = function(e, t) {
      window.localStorage && window.localStorage.setItem && window.localStorage.setItem(e, t)
    }, b.clearData = function(e) {
      window.localStorage && window.localStorage.removeItem && window.localStorage.removeItem(e)
    }, b.endGame = function() {
      this.gameOverReady = !1, this.gameOverAlpha = 0, this.updateGameOver(), this.state = "game_over", this.timePlayed = horde.now() - this.gameStartTime
    }, b.toggleFullscreen = function() {
      horde.sound.play("select_pointer"), this.enableFullscreen = !this.enableFullscreen;
      var e = this.enableFullscreen ? 1 : 0;
      this.putData("fullscreen", e), this.resize()
    }
  }(),
  function() {
    horde.Object = function() {
      this.id = "", this.ownerId = null, this.position = new horde.Vector2, this.size = new horde.Size(32, 32), this.direction = new horde.Vector2, this.facing = new horde.Vector2(0, 1), this.speed = 100, this.team = null, this.hitPoints = 1, this.damage = 1, this.spriteSheet = "", this.spriteX = 0, this.spriteY = 0, this.spriteAlign = !1, this.animated = !1, this.animFrameIndex = 0, this.animNumFrames = 2, this.animDelay = 200, this.animElapsed = 0, this.spawnFrameIndex = 0, this.spawnFrameCount = 2, this.spawnFramesX = 0, this.spawnFramesY = 0, this.angle = 0, this.rotateSpeed = 400, this.rotate = !1, this.worth = 0, this.ttl = 0, this.ttlElapsed = 0, this.alpha = 1, this.alphaMod = 1, this.gibletSize = "small", this.cooldown = !1, this.cooldownElapsed = 0, this.autoFire = !1, this.soundAttacks = null, this.soundDamage = null, this.soundDies = null, this.alive = !0, this.states = [], this.addState(horde.Object.states.IDLE), this.currentWeaponIndex = 0, this.collidable = !0, this.bounce = !0, this.piercing = !1, this.soundDamage = null, this.soundDies = null, this.damageType = "physical", this.drawIndex = 1, this.moveChangeElapsed = 0, this.moveChangeDelay = 500, this.wounds = 0, this.weapons = [], this.gold = 0, this.kills = 0, this.timesWounded = 0, this.totalDamageTaken = 0, this.shotsFired = 0, this.shotsLanded = 0, this.shotsPerWeapon = {}, this.meatEaten = 0, this.cheater = !1, this.phase = 0, this.phaseInit = !1, this.lootTable = [], this.killSwitch = !1
    }, horde.Object.states = {
      IDLE: 0,
      MOVING: 1,
      ATTACKING: 2,
      HURTING: 3,
      DYING: 4,
      INVINCIBLE: 5,
      INVISIBLE: 6,
      SPAWNING: 7,
      DESPAWNING: 8,
      STUNNED: 9,
      VICTORIOUS: 10
    };
    var e = horde.Object.prototype;
    e.load = function(e) {
      var t = JSON.parse(e);
      this.wounds = t.wounds, this.weapons = t.weapons, this.currentWeaponIndex = t.currentWeaponIndex, this.gold = t.gold, this.kills = t.kills, this.timesWounded = t.timesWounded, this.totalDamageTaken = t.totalDamageTaken, this.shotsFired = t.shotsFired, this.shotsLanded = t.shotsLanded, this.shotsPerWeapon = t.shotsPerWeapon, this.meatEaten = t.meatEaten, this.cheater = t.cheater
    }, e.setPhase = function(e) {
      this.phase = e, this.phaseInit = !1
    }, e.nextPhase = function() {
      this.setPhase(this.phase + 1)
    }, e.updateStates = function(e) {
      for (var t in this.states) {
        var i = this.states[t];
        i.timer.update(e), i.timer.expired() && this.removeStateById(t)
      }
    }, e.hasState = function(e) {
      for (var t in this.states)
        if (this.states[t].type === e) return !0;
      return !1
    }, e.addState = function(e, t) {
      if (this.hasState(e)) return !1;
      var i = new horde.Timer;
      switch (i.start(t), this.states.push({
        type: e,
        timer: i
      }), e) {
        case horde.Object.states.SLOWED:
          this.oldAnimDelay = this.animDelay, this.animDelay *= 2
      }
    }, e.removeStateById = function(e) {
      var t = this.states[e];
      switch (t.type) {
        case horde.Object.states.INVINCIBLE:
          this.alpha = 1, this.alphaMod = -1;
          break;
        case horde.Object.states.SLOWED:
          this.animDelay = this.oldAnimDelay
      }
      delete this.states[e]
    }, e.removeState = function(e) {
      for (var t in this.states) this.states[t].type === e && this.removeStateById(t)
    }, e.init = function() {
      this.execute("onInit"), this.rotate && (this.angle = horde.randomRange(0, 359)), this.animated && (this.animElapsed = horde.randomRange(0, this.animDelay))
    }, e.die = function() {
      this.alive = !1
    }, e.isDead = function() {
      return !this.alive
    }, e.update = function(e, t) {
      if (this.killSwitch === !1 && null !== this.ownerId && !t.isAlive(this.ownerId)) {
        switch (this.role) {
          case "projectile":
          case "trap":
            this.ttl = 1e3, this.ttlElapsed = 0;
            break;
          case "monster":
            this.wound(this.hitPoints)
        }
        this.killSwitch = !0
      }
      if (this.updateStates(e), this.deathTimer && this.deathTimer.update(e), this.hasState(horde.Object.states.DYING) && this.deathTimer.expired() && (this.deathFrameIndex++, this.deathTimer.reset(), this.deathFrameIndex > 2 && (this.deathFrameIndex = 2, this.ttl = 750)), this.hasState(horde.Object.states.INVINCIBLE) && (this.alpha += .01 * e * this.alphaMod, this.alpha >= 1 && (this.alpha = 1, this.alphaMod = -1), this.alpha <= 0 && (this.alpha = 0, this.alphaMod = 1)), !this.hasState(horde.Object.states.STUNNED)) {
        if (this.animated && (this.animElapsed += e, this.animElapsed >= this.animDelay && (this.animElapsed = 0, this.animFrameIndex++, this.animFrameIndex > this.animNumFrames - 1 && (this.animFrameIndex = 0), this.hasState(horde.Object.states.SPAWNING) && (this.spawnFrameIndex++, this.spawnFrameIndex > this.spawnFrameCount && this.removeState(horde.Object.states.SPAWNING)), this.hasState(horde.Object.states.DESPAWNING) && (this.spawnFrameIndex--, this.spawnFrameIndex < 0 && this.removeState(horde.Object.states.DESPAWNING)))), this.spriteAlign && (this.angle = this.facing.angle()), this.rotate && (this.angle += this.rotateSpeed / 1e3 * e), this.ttl > 0 && (this.ttlElapsed += e, this.ttl - this.ttlElapsed <= 1e3 && (this.alpha -= .001 * e), this.ttlElapsed >= this.ttl && this.die()), this.cooldown === !0) {
          this.cooldownElapsed += e;
          var i = this.getWeaponInfo(),
            s = horde.objectTypes[i.type];
          this.cooldownElapsed >= s.cooldown && (this.cooldown = !1, this.cooldownElapsed = 0)
        }
        if (this.phaseTimer && this.phaseTimer.update(e), !this.hasState(horde.Object.states.DYING)) return this.execute("onUpdate", arguments)
      }
    }, e.getSpriteXY = function(e) {
      if (!this.animated) return new horde.Vector2(this.spriteX, this.spriteY);
      switch (this.role) {
        case "hero":
        case "monster":
          if (this.hasState(horde.Object.states.DYING)) return new horde.Vector2((17 + this.deathFrameIndex) * this.size.width, this.spriteY);
          if (this.hasState(horde.Object.states.SPAWNING) || this.hasState(horde.Object.states.DESPAWNING)) return new horde.Vector2(this.spawnFramesX + this.spawnFrameIndex * this.size.width, this.spawnFramesY);
          if (this.hasState(horde.Object.states.HURTING) && this.size.width <= 32) return new horde.Vector2(16 * this.size.width, this.spriteY);
          if (this.hasState(horde.Object.states.VICTORIOUS)) return new horde.Vector2(20 * this.size.width, this.spriteY);
          if (e) var t = e;
          else var t = this.facing.clone();
          var i = horde.directions.fromVector(t);
          return new horde.Vector2((2 * i + this.animFrameIndex) * this.size.width, this.spriteY);
        default:
          return this.hasState(horde.Object.states.SPAWNING) || this.hasState(horde.Object.states.DESPAWNING) ? new horde.Vector2(this.spawnFramesX + this.spawnFrameIndex * this.size.width, this.spawnFramesY) : new horde.Vector2(this.spriteX + this.animFrameIndex * this.size.width, this.spriteY)
      }
    }, e.boundingBox = function() {
      var e = new horde.Rect(this.position.x, this.position.y, this.size.width - 1, this.size.height - 1);
      return "projectile" === this.role && e.reduce(1), "e_spit_pool" === this.type && (e.y += this.size.height / 4, e.x += 5, e.height -= this.size.height / 2, e.width -= 10), "gas_cloud" === this.type && (e.y += 32, e.x += 32, e.height -= 32, e.width -= 32), e
    }, e.centerOn = function(e) {
      this.position = e.subtract(horde.Vector2.fromSize(this.size).scale(.5))
    }, e.wound = function(e) {
      return 1 > e || this.hasState(horde.Object.states.DYING) || this.isDead() ? !1 : (this.removeState(horde.Object.states.STUNNED), this.wounds += e, this.totalDamageTaken += e, this.timesWounded++, ("monster" === this.role || "hero" === this.role) && this.addState(horde.Object.states.HURTING, 300), this.wounds >= this.hitPoints ? (this.wounds = this.hitPoints, "monster" === this.role || "hero" === this.role ? (this.addState(horde.Object.states.DYING), this.deathFrameIndex = 0, this.deathTimer = new horde.Timer, this.deathTimer.start(200)) : this.die(), "hero" === this.role && horde.sound.stopAll(), this.soundDies && horde.sound.play(this.soundDies), !0) : (this.soundDamage && horde.sound.play(this.soundDamage), !1))
    }, e.wallCollide = function(e) {
      if ("hero" !== this.role) {
        if (this.bounce) {
          var t = this.direction.clone();
          for (var i in e) t[e[i]] *= -1;
          this.setDirection(t), "projectile" === this.role && horde.sound.play("weapon_wall")
        } else "physical" === this.damageType ? this.deflect() : this.die();
        this.execute("onWallCollide", [e])
      }
    }, e.deflect = function() {
      this.role = "fluff", this.rotateSpeed = 5 * this.speed, this.speed *= .5, this.spriteAlign = !1, this.rotate = !0, this.ttl = 100, this.alpha = .5, this.bounce = !0
    }, e.setDirection = function(e) {
      0 === e.x && 0 === e.y ? this.stopMoving() : (this.direction = e, this.facing = this.direction.clone())
    }, e.reverseDirection = function() {
      var e = this.direction.clone();
      e.scale(-1), this.setDirection(e)
    }, e.chase = function(e) {
      this.moveToward(e.position.clone())
    }, e.moveToward = function(e) {
      var t = e.clone().subtract(this.position).normalize();
      this.setDirection(t)
    }, e.isMoving = function() {
      return this.hasState(horde.Object.states.DYING) ? !1 : 0 !== this.direction.x || 0 !== this.direction.y
    }, e.stopMoving = function() {
      this.direction.zero()
    }, e.execute = function(e, t) {
      return this[e] ? this[e].apply(this, t) : void 0
    }, e.getWeaponInfo = function() {
      var e = this.weapons.length;
      return e >= 1 ? (this.currentWeaponIndex < 0 && (this.currentWeaponIndex = 0), this.currentWeaponIndex > e - 1 && (this.currentWeaponIndex = e - 1), this.weapons[this.currentWeaponIndex]) : !1
    }, e.addWeapon = function(e, t) {
      var i = [];
      for (var s in this.weapons) {
        var a = this.weapons[s];
        "undefined" != typeof a && a.type === e && (null !== a.count ? t += a.count : t = null), null !== a.count && i.push(s)
      }
      for (var o in i) this.weapons = this.weapons.splice(o, 1);
      var n = this.weapons.push({
        type: e,
        count: t
      });
      this.currentWeaponIndex = n - 1
    }, e.cycleWeapon = function(e) {
      var t = this.weapons.length;
      e === !0 ? (this.currentWeaponIndex--, this.currentWeaponIndex < 0 && (this.currentWeaponIndex = t - 1)) : (this.currentWeaponIndex++, this.currentWeaponIndex > t - 1 && (this.currentWeaponIndex = 0))
    }, e.fireWeapon = function() {
      var e = this.weapons.length;
      if (this.cooldown === !0 || 1 > e) return !1;
      var t = this.getWeaponInfo();
      return null !== t.count && (t.count -= 1, t.count < 1 && this.weapons.splice(this.currentWeaponIndex, 1)), this.cooldown = !0, t.type
    }, e.hasWeapon = function(e) {
      for (var t = this.weapons.length, i = 0; t > i; ++i) {
        var s = this.weapons[i];
        if (s.type === e) return !0
      }
      return !1
    }
  }(),
  function() {
    horde.objectTypes = {};
    var e = horde.objectTypes;
    e.hero = {
      role: "hero",
      team: 0,
      speed: 150,
      hitPoints: 100,
      damage: 0,
      damageType: null,
      spriteSheet: "characters",
      spriteY: 992,
      animated: !0,
      soundAttacks: "hero_attacks",
      soundDamage: "hero_damage",
      soundDies: "hero_dies",
      weapons: [{
        type: "h_sword",
        count: null
      }],
      isMeatboy: !1,
      bloodTimer: null,
      onInit: function() {
        this.isMeatboy && this.initMeatBoy()
      },
      initMeatBoy: function() {
        this.hitPoints = 1, this.spriteY = 1024, this.bloodTimer = new horde.Timer, this.bloodTimer.start(100)
      },
      onUpdate: function(e, t) {
        if (this.isMeatboy && (this.bloodTimer.update(e), this.bloodTimer.expired() && this.isMoving())) {
          var i = t.spawnObject(this, "blood_pool"),
            s = t.objects[i];
          s.position.x += horde.randomRange(-8, 8), s.position.y += horde.randomRange(-8, 8), s.angle = horde.randomRange(0, 1.5 * Math.PI), this.bloodTimer.start(horde.randomRange(75, 150))
        }
      },
      onKilled: function(e, t) {
        for (var i = 10, s = 0; i > s; ++s) {
          var a = horde.makeObject("mini_skull");
          a.position.x = this.position.x + s * (this.size.width / i), a.position.y = this.position.y + this.size.height - horde.randomRange(0, this.size.height), t.addObject(a)
        }
      }
    }, e.blood_pool = {
      role: "fluff",
      size: new horde.Size(32, 32),
      speed: 0,
      ttl: 1250,
      collidable: !1,
      spriteSheet: "objects",
      spriteX: 128,
      spriteY: 32,
      drawIndex: 0
    }, e.h_sword = {
      role: "projectile",
      cooldown: 300,
      speed: 250,
      hitPoints: 1,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 64,
      spriteY: 0,
      spriteAlign: !0,
      priority: 0,
      bounce: !1
    }, e.h_knife = {
      role: "projectile",
      size: new horde.Size(32, 30),
      cooldown: 200,
      speed: 350,
      hitPoints: 1,
      damage: 5,
      spriteSheet: "objects",
      spriteX: 32,
      spriteY: 0,
      spriteAlign: !0,
      priority: 1,
      bounce: !1
    }, e.h_spear = {
      role: "projectile",
      cooldown: 350,
      speed: 500,
      hitPoints: 1,
      damage: 15,
      spriteSheet: "objects",
      spriteX: 96,
      spriteY: 0,
      spriteAlign: !0,
      priority: 2,
      bounce: !1,
      piercing: !0
    }, e.h_fireball = {
      role: "projectile",
      cooldown: 300,
      speed: 400,
      rotateSpeed: 500,
      hitPoints: 1,
      damage: 3,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 0,
      rotate: !0,
      ttl: 450,
      soundAttacks: "fire_attack",
      priority: 3,
      bounce: !1,
      damageType: "magic",
      onInit: function() {
        this.trailTimer = new horde.Timer, this.trailTimer.start(75)
      },
      onUpdate: function(e, t) {
        this.trailTimer.update(e), this.trailTimer.expired() && (t.spawnObject(this, "h_fireball_trail"), this.trailTimer.reset())
      }
    }, e.h_fireball_trail = {
      role: "projectile",
      speed: 0,
      rotateSpeed: 150,
      hitPoints: 1,
      damage: 5,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 0,
      rotate: !0,
      ttl: 500,
      alpha: .5,
      priority: 3,
      bounce: !1,
      damageType: "magic",
      drawIndex: 0
    }, e.h_axe = {
      role: "projectile",
      cooldown: 500,
      speed: 225,
      hitPoints: 1,
      damage: 20,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 32,
      rotate: !0,
      rotateSpeed: 700,
      priority: 5,
      ttl: 4e3,
      piercing: !0
    }, e.h_fire_sword = {
      role: "projectile",
      cooldown: 450,
      speed: 350,
      hitPoints: 1,
      damage: 25,
      spriteSheet: "objects",
      spriteX: 384,
      spriteY: 0,
      priority: 6,
      bounce: !1,
      spriteAlign: !0,
      piercing: !0,
      soundAttacks: "fire_attack",
      damageType: "magic",
      onInit: function() {
        this.spawnTimer = new horde.Timer, this.spawnTimer.start(50)
      },
      onUpdate: function(e, t) {
        this.spawnTimer.update(e), this.spawnTimer.expired() && (t.spawnObject(this, "fire_sword_trail"), this.spawnTimer.reset())
      }
    }, e.fire_sword_trail = {
      role: "projectile",
      speed: 0,
      hitPoints: 1,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 0,
      rotate: !0,
      soundAttacks: "fire_attack",
      ttl: 500,
      bounce: !1,
      drawIndex: 0,
      damageType: "magic"
    }, e.h_fire_knife = {
      role: "projectile",
      size: new horde.Size(32, 30),
      cooldown: 200,
      speed: 350,
      hitPoints: 1,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 128,
      spriteY: 0,
      priority: 6,
      bounce: !1,
      spriteAlign: !0,
      piercing: !0,
      soundAttacks: "fire_attack",
      damageType: "magic",
      onInit: function() {
        this.spawnTimer = new horde.Timer, this.spawnTimer.start(50)
      },
      onUpdate: function(e, t) {
        this.spawnTimer.update(e), this.spawnTimer.expired() && (t.spawnObject(this, "fire_sword_trail"), this.spawnTimer.reset())
      }
    }, e.h_firebomb = {
      role: "projectile",
      cooldown: 500,
      speed: 150,
      rotateSpeed: 300,
      hitPoints: 1,
      damage: 2,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 0,
      rotate: !0,
      ttl: 550,
      soundAttacks: "fire_attack",
      priority: 3,
      bounce: !1,
      damageType: "magic"
    };
    var t = {
      chase: function(e, t) {
        if (this.moveChangeDelay > 0) {
          if (this.moveChangeElapsed += e, this.moveChangeElapsed < this.moveChangeDelay) return;
          this.moveChangeElapsed = 0
        }
        var i = t.getPlayerObject();
        return this.chase(i), "shoot"
      },
      getNear: function(e, i) {
        this.speed = this.defaultSpeed;
        var s = i.getPlayerObject(),
          a = s.position.clone().subtract(this.position).magnitude();
        if (100 > a) this.chase(s), this.setDirection(this.direction.invert());
        else if (a > 150) this.chase(s);
        else {
          if (!this.cooldown) return this.chase(s), this.speed = 0, "shoot";
          t.wander.apply(this, arguments)
        }
      },
      wander: function(e) {
        if (this.moveChangeElapsed += e, this.moveChangeElapsed >= this.moveChangeDelay) {
          this.moveChangeElapsed = 0;
          var t = horde.randomDirection();
          if (0 === t.x && 0 === t.y) return;
          this.setDirection(t)
        }
      },
      wanderShoot: function(e, i) {
        var s = i.getPlayerObject(),
          a = s.position.clone().subtract(this.position).abs();
        return !this.cooldown && (a.x < s.size.width / 2 || a.y < s.size.height / 2) ? (this.chase(s), "shoot") : void t.wander.apply(this, arguments)
      },
      wanderThenChase: function(e, i) {
        var s = i.getPlayerObject(),
          a = {
            x: s.position.x,
            y: s.position.y
          },
          o = this.position.x,
          n = this.position.y;
        if (this.seenHero) t.chase.apply(this, arguments);
        else {
          t.wander.apply(this, arguments);
          var r = Math.abs(o - a.x),
            h = Math.abs(n - a.y);
          if (64 > r && 64 > h) return horde.sound.play(this.soundAttacks), this.seenHero = !0, "shoot"
        }
      }
    };
    e.bat = {
      role: "monster",
      team: 1,
      speed: 100,
      hitPoints: 5,
      damage: 2,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 96,
      animated: !0,
      animDelay: 150,
      moveChangeElapsed: 0,
      moveChangeDelay: 500,
      soundDamage: "bat_damage",
      soundDies: "bat_dies",
      lootTable: [{
        type: null,
        weight: 9
      }, {
        type: "item_coin",
        weight: 1
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3)
      },
      onUpdate: function() {
        this.position.y >= 50 && (this.onUpdate = t.wander)
      }
    }, e.dire_bat = {
      role: "monster",
      team: 1,
      speed: 150,
      hitPoints: 10,
      damage: 5,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 128,
      animated: !0,
      animDelay: 150,
      moveChangeElapsed: 0,
      moveChangeDelay: 500,
      soundDamage: "bat_damage",
      soundDies: "bat_dies",
      lootTable: [{
        type: null,
        weight: 7
      }, {
        type: "item_coin",
        weight: 3
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3)
      },
      onUpdate: function() {
        this.position.y >= 50 && (this.onUpdate = t.wander)
      }
    }, e.goblin = {
      role: "monster",
      team: 1,
      speed: 75,
      hitPoints: 10,
      damage: 10,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 160,
      animated: !0,
      gibletSize: "medium",
      moveChangeElapsed: 0,
      moveChangeDelay: 3e3,
      weapons: [{
        type: "e_arrow",
        count: null
      }],
      soundAttacks: "goblin_attacks",
      soundDamage: "goblin_damage",
      soundDies: "goblin_dies",
      lootTable: [{
        type: null,
        weight: 6
      }, {
        type: "item_coin",
        weight: 1
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }, {
        type: "item_food",
        weight: 1
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3)
      },
      onUpdate: function() {
        this.position.y >= 50 && (this.onUpdate = t.wanderShoot)
      }
    }, e.hunter_goblin = {
      role: "monster",
      team: 1,
      speed: 75,
      hitPoints: 10,
      damage: 10,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 160,
      animated: !0,
      gibletSize: "medium",
      moveChangeElapsed: 0,
      moveChangeDelay: 3e3,
      weapons: [{
        type: "e_arrow",
        count: null
      }],
      soundAttacks: "goblin_attacks",
      soundDamage: "goblin_damage",
      soundDies: "goblin_dies",
      lootTable: [{
        type: null,
        weight: 2
      }, {
        type: "item_coin",
        weight: 4
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }, {
        type: "item_food",
        weight: 2
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3)
      },
      onUpdate: function(e, i) {
        if (this.position.y >= 50) {
          if (!this.cooldown) return this.chase(i.getPlayerObject()), "shoot";
          t.wander.apply(this, arguments)
        }
      }
    }, e.demoblin = {
      role: "monster",
      team: 1,
      speed: 75,
      defaultSpeed: 75,
      hitPoints: 30,
      damage: 15,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 192,
      animated: !0,
      gibletSize: "medium",
      moveChangeElapsed: 0,
      moveChangeDelay: 3e3,
      weapons: [{
        type: "e_trident",
        count: null
      }],
      lootTable: [{
        type: null,
        weight: 6
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }, {
        type: "item_chest",
        weight: 1
      }, {
        type: "item_food",
        weight: 1
      }],
      soundAttacks: "demoblin_attacks",
      soundDamage: "goblin_damage",
      soundDies: "goblin_dies",
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3), this.cooldown = !0, this.cooldownElapsed = horde.randomRange(0, 5e3)
      },
      onUpdate: function() {
        this.position.y >= 50 && (this.onUpdate = t.getNear)
      }
    }, e.flaming_skull = {
      role: "monster",
      team: 1,
      speed: 200,
      hitPoints: 50,
      damage: 10,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 32,
      animated: !0,
      setDir: !1,
      soundDamage: "skull_damage",
      soundDies: "skull_dies",
      weapons: [{
        type: "e_static_blue_fire",
        count: null
      }],
      lootTable: [{
        type: null,
        weight: 6
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }, {
        type: "item_chest",
        weight: 2
      }],
      onInit: function() {
        switch (horde.randomRange(1, 2)) {
          case 1:
            this.speed *= .5, this.animDelay *= .5;
            break;
          case 2:
            this.speed *= .75, this.animDelay *= .75
        }
      },
      onUpdate: function() {
        if (!this.setDir && this.position.y >= 50) {
          var e = this.direction.clone();
          e.x = Math.random(), Math.random() >= .5 && (e.x *= -1), this.setDirection(e), this.setDir = !0
        }
        return "shoot"
      }
    }, e.huge_skull = {
      role: "monster",
      team: 1,
      badass: !0,
      speed: 150,
      hitPoints: 200,
      damage: 20,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 864,
      animated: !0,
      size: new horde.Size(64, 64),
      setDir: !1,
      soundDamage: "skull_damage",
      soundDies: "skull_dies",
      weapons: [{
        type: "e_static_green_fire",
        count: null
      }],
      lootTable: [{
        type: null,
        weight: 4
      }, {
        type: "WEAPON_DROP",
        weight: 3
      }, {
        type: "item_chest",
        weight: 3
      }],
      onInit: function() {
        switch (this.phaseTimer = new horde.Timer, horde.randomRange(1, 2)) {
          case 1:
            this.speed *= .5, this.animDelay *= .5;
            break;
          case 2:
            this.speed *= .75, this.animDelay *= .75
        }
      },
      onUpdate: function(e, t) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.phaseInit = !0), this.position.y >= 50 && this.nextPhase();
            break;
          case 1:
            if (!this.phaseInit) {
              var i = this.direction.clone();
              i.x = Math.random(), Math.random() >= .5 && (i.x *= -1), this.setDirection(i), this.phaseTimer.start(horde.randomRange(2e3, 4e3)), this.phaseInit = !0
            }
            this.phaseTimer.expired() && this.nextPhase();
            break;
          case 2:
            this.phaseInit || (this.speed *= 2, this.animDelay *= 2, this.phaseTimer.start(horde.randomRange(250, 500)), this.phaseInit = !0), this.phaseTimer.expired() && (this.speed /= 2, this.animDelay /= 2, this.setPhase(1)), this.chase(t.getPlayerObject())
        }
        return "shoot"
      }
    }, e.spike_wall = {
      role: "trap",
      team: 1,
      speed: 150,
      hitPoints: 1 / 0,
      damage: 20,
      spriteSheet: "objects",
      spriteX: 32,
      spriteY: 256,
      drawIndex: 0,
      animated: !0,
      animNumFrames: 1,
      spawnFramesX: 96,
      spawnFramesY: 576,
      spawnFrameCount: 2,
      rotate: !0,
      rotateSpeed: 0,
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.spinUpTime = 7500, this.wallDirection = new horde.Vector2(0, 1), this.addState(horde.Object.states.SPAWNING)
      },
      onDamage: function() {
        this.spriteX = 128
      },
      onUpdate: function(e) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.phaseTimer.start(this.spinUpTime), this.phaseInit = !0);
            var t = this.spinUpTime / 200;
            this.rotateSpeed += t / 1e3 * e, this.phaseTimer.expired() && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (horde.sound.play("spike_attack"), this.setDirection(this.wallDirection), this.phaseInit = !0)
        }
      },
      onWallCollide: function() {
        this.stopMoving(), this.ttl = 1500
      }
    }, e.spike_sentry = {
      role: "trap",
      team: 1,
      speed: 100,
      hitPoints: 1 / 0,
      damage: 10,
      worth: 0,
      spriteSheet: "objects",
      spriteX: 64,
      spriteY: 256,
      animated: !0,
      animNumFrames: 1,
      spawnFramesX: 0,
      spawnFramesY: 576,
      spawnFrameCount: 2,
      rotate: !0,
      rotateSpeed: 100,
      phase: 0,
      phaseInit: !1,
      onInit: function() {
        this.addState(horde.Object.states.SPAWNING)
      },
      onDamage: function(e) {
        "hero" === e.role && (this.spriteX = 160)
      },
      onUpdate: function(e, t) {
        if (!this.hasState(horde.Object.states.SPAWNING)) switch (this.phase) {
          case 0:
            this.phaseInit || (this.stopMoving(), this.phaseInit = !0);
            var i = t.getPlayerObject(),
              s = i.position.clone().subtract(this.position);
            if (Math.abs(s.y) < 32) {
              this.originalPos = this.position.clone();
              var a = new horde.Vector2;
              a.x = s.x < 0 ? -1 : 1, this.setDirection(a), this.phase++, this.phaseInit = !1, horde.sound.play("spike_attack")
            } else if (Math.abs(s.x) < 32) {
              this.originalPos = this.position.clone();
              var a = new horde.Vector2;
              a.y = s.y < 0 ? -1 : 1, this.setDirection(a), this.phase++, this.phaseInit = !1, horde.sound.play("spike_attack")
            }
            break;
          case 1:
            this.phaseInit || (this.speed = 300, this.rotateSpeed = 300, this.phaseInit = !0);
            var s = this.position.clone().subtract(this.originalPos).abs();
            if (s.x > 256) {
              var a = this.direction.clone();
              a.x *= -1, this.setDirection(a), this.phase++, this.phaseInit = !1
            } else if (s.y > 128) {
              var a = this.direction.clone();
              a.y *= -1, this.setDirection(a), this.phase++, this.phaseInit = !1
            }
            break;
          case 2:
            this.phaseInit || (this.speed = 50, this.rotateSpeed = 100, this.phaseInit = !0);
            var s = this.position.clone().subtract(this.originalPos).abs();
            s.x < 5 && s.y < 5 && (this.stopMoving(), this.position = this.originalPos.clone(), this.phase = 0, this.phaseInit = !1)
        }
      }
    }, e.spikes = {
      role: "trap",
      team: 1,
      speed: 0,
      hitPoints: 1 / 0,
      damage: 10,
      worth: 0,
      spriteSheet: "objects",
      spriteX: 0,
      spriteY: 256,
      animated: !0,
      animNumFrames: 1,
      spawnFramesX: 224,
      spawnFramesY: 256,
      spawnFrameCount: 3,
      collidable: !1,
      onInit: function() {
        this.addState(horde.Object.states.SPAWNING)
      },
      onDamage: function(e) {
        "hero" === e.role && (this.spriteX = 96)
      }
    }, e.owlbear = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteY: 800,
      damage: 15,
      hitPoints: 250,
      speed: 75,
      soundAlarm: "owlbear_alarm",
      soundAttacks: "owlbear_attacks",
      soundDamage: "owlbear_damage",
      soundDies: "owlbear_dies",
      lootTable: [{
        type: "item_food",
        weight: 1
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3), this.phaseTimer = new horde.Timer
      },
      onUpdate: function(e, i) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.speed = 150, this.animDelay = 150, this.phaseInit = !0), this.position.y >= 60 && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (this.speed = 75, this.animDelay = 300, this.phaseInit = !0), t.wander.apply(this, arguments);
            var s = i.getPlayerObject(),
              a = s.position.clone().subtract(this.position).abs();
            (a.x < this.size.width / 2 || a.y < this.size.height / 2) && (this.chase(s), this.nextPhase());
            break;
          case 2:
            this.phaseInit || (horde.sound.play(this.soundAlarm), this.speed = 0, this.animDelay = 150, this.phaseTimer.start(500), this.phaseInit = !0), this.position.x += horde.randomRange(-1, 1), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 3:
            this.phaseInit || (horde.sound.play(this.soundAttacks), this.speed = 350, this.animDelay = 75, this.phaseTimer.start(2e3), this.phaseInit = !0), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 4:
            this.phaseInit || (this.stopMoving(), this.animDelay = 400, this.phaseTimer.start(1250), this.phaseInit = !0), this.phaseTimer.expired() && this.setPhase(1)
        }
      }
    }, e.cyclops = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      gibletSize: "large",
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteY: 224,
      moveChangeElapsed: 0,
      moveChangeDelay: 1e3,
      damage: 20,
      hitPoints: 200,
      speed: 100,
      animDelay: 100,
      worth: 0,
      soundAttacks: "cyclops_attacks",
      soundDamage: "cyclops_damage",
      soundDies: "cyclops_dies",
      weapons: [{
        type: "e_boulder",
        count: null
      }],
      lootTable: [{
        type: "item_food",
        weight: 7
      }, {
        type: "WEAPON_DROP",
        weight: 3
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3), this.setDirection(horde.directions.toVector(horde.directions.DOWN))
      },
      onUpdate: function() {
        this.position.y >= 50 && (this.speed = 25, this.animDelay = 200, this.onUpdate = t.chase)
      }
    }, e.eyelet = {
      role: "monster",
      team: 1,
      animated: !0,
      spriteSheet: "characters",
      spriteY: 512,
      damage: 10,
      hitPoints: 40,
      speed: 100,
      soundDamage: "eyelet_damage",
      soundDies: "eyelet_dies",
      collidable: !1,
      lootTable: [{
        type: null,
        weight: 9
      }, {
        type: "item_food",
        weight: 1
      }, {
        type: "WEAPON_DROP",
        weight: 8
      }, {
        type: "item_weapon_fireball",
        weight: 2
      }],
      makeBadass: function() {
        this.spriteY = 960, this.hitPoints = 50, this.speed = 150, this.damage = 20
      },
      onInit: function() {
        horde.randomRange(1, 10) > 5 && (this.spriteY += 32), this.ownerAngle = 0, this.phaseTimer = new horde.Timer, this.addState(horde.Object.states.INVINCIBLE, 1e3)
      },
      onUpdate: function(e, i) {
        if (!i.objects[this.ownerId]) return void this.wound(this.hitPoints);
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.phaseTimer.start(1e4), this.phaseInit = !0);
            var s = i.objects[this.ownerId],
              a = s.position.clone().add(horde.Vector2.fromSize(s.size).scale(.5)).subtract(new horde.Vector2(10, 10)),
              o = horde.Vector2.fromHeading(this.ownerAngle);
            this.position = a.add(o.scale(s.eyeletOffset)), this.ownerAngle += 1.05 / 1e3 * e, this.ownerAngle > 2 * Math.PI && (this.ownerAngle = 0), this.phaseTimer.expired() && i.checkTileCollision(this) === !1 && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (this.collidable = !0, this.speed = 175, this.phaseInit = !0), t.wander.apply(this, arguments)
        }
      }
    }, e.cube = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      animDelay: 400,
      gibletSize: "large",
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteY: 576,
      moveChangeElapsed: 0,
      moveChangeDelay: 1e3,
      damage: 35,
      hitPoints: 750,
      speed: 15,
      worth: 0,
      soundAttacks: "cube_attacks",
      soundDamage: "cube_damage",
      soundDies: "cube_dies",
      lootTable: [{
        type: "item_gold_chest",
        weight: 1
      }],
      onInit: function() {
        this.moveChangeDelay = horde.randomRange(500, 1e3), this.setDirection(horde.directions.toVector(horde.directions.DOWN)), this.phaseTimer = new horde.Timer, this.gelTimer = new horde.Timer
      },
      onThreat: function(e) {
        return "magic" !== e.damageType ? !0 : void 0
      },
      onUpdate: function(e, i) {
        switch (this.gelTimer.update(e), this.phase) {
          case 0:
            this.phaseInit || (this.speed = 100, this.animDelay = 200, this.phaseInit = !0), this.position.y >= 150 && this.nextPhase();
            break;
          case 1:
            if (this.phaseInit || (this.stopMoving(), this.speed = 15, this.animDelay = 400, this.phaseTimer.start(6e3), this.gelTimer.start(300), this.phaseInit = !0), this.phaseTimer.expired()) {
              this.nextPhase();
              break
            }
            t.wander.apply(this, arguments), this.position.x += horde.randomRange(-1, 1), this.gelTimer.expired() && (i.spawnObject(this, "gel"), horde.sound.play(this.soundAttacks), this.gelTimer.reset());
            break;
          case 2:
            if (this.phaseInit || (this.speed = 30, this.animDelay = 150, this.phaseTimer.start(7500), this.phaseInit = !0), this.phaseTimer.expired()) {
              this.setPhase(1);
              break
            }
            t.chase.apply(this, arguments)
        }
      }
    }, e.gel = {
      role: "monster",
      team: 1,
      animated: !0,
      animDelay: 400,
      spriteSheet: "characters",
      spriteY: 640,
      moveChangeElapsed: 0,
      moveChangeDelay: 1e3,
      damage: 5,
      hitPoints: 10,
      speed: 150,
      worth: 0,
      soundDamage: "gel_damage",
      soundDies: "gel_dies",
      onInit: function() {
        switch (this.setDirection(horde.randomDirection()), this.moveChangeDelay = horde.randomRange(500, 1e3), horde.randomRange(1, 4)) {
          case 1:
            this.spriteY = 640;
            break;
          case 2:
            this.spriteY = 672;
            break;
          case 3:
            this.spriteY = 704;
            break;
          case 4:
            this.spriteY = 736
        }
      },
      onUpdate: function() {
        t.wander.apply(this, arguments)
      },
      onKilled: function(e, t) {
        var i = t.getPlayerObject();
        i.hasWeapon("h_fireball") || i.hasWeapon("h_fire_sword") || 0 !== t.getObjectCountByType("item_weapon_fireball") || t.dropObject(this, "item_weapon_fireball")
      }
    }, e.superclops = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      gibletSize: "large",
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteY: 288,
      moveChangeElapsed: 0,
      moveChangeDelay: 1e3,
      damage: 20,
      hitPoints: 750,
      speed: 25,
      worth: 0,
      soundAttacks: "minotaur_attacks",
      soundDamage: "minotaur_damage",
      soundDies: "minotaur_dies",
      weapons: [{
        type: "e_minotaur_trident",
        count: null
      }],
      lootTable: [{
        type: "item_gold_chest",
        weight: 1
      }],
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.moveChangeDelay = horde.randomRange(500, 1e3), this.setDirection(horde.directions.toVector(horde.directions.DOWN))
      },
      onUpdate: function(e, i) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.speed = 200, this.animDelay = 100, this.phaseInit = !0), this.position.y >= 80 && this.nextPhase();
            break;
          case 1:
            if (!this.phaseInit) {
              this.animDelay = 250;
              var s = i.getPlayerObject();
              this.chase(s), this.stopMoving();
              var a = this.facing.heading();
              i.spawnObject(this, "e_bouncing_boulder", horde.Vector2.fromHeading(a - .3)), i.spawnObject(this, "e_bouncing_boulder", horde.Vector2.fromHeading(a + .3)), this.phaseTimer.start(1500), this.phaseInit = !0
            }
            this.phaseTimer.expired() && this.nextPhase();
            break;
          case 2:
            this.phaseInit || (this.speed = 300, this.animDelay = 100, this.setDirection(this.facing), this.phaseTimer.start(2e3), this.phaseInit = !0), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 3:
            this.phaseInit || (this.speed = 15, this.animDelay = 400, this.phaseTimer.start(2e3), this.phaseInit = !0), t.wander.apply(this, arguments), this.phaseTimer.expired() && (this.wounds > this.hitPoints / 2 ? this.nextPhase() : this.setPhase(1));
            break;
          case 4:
            if (this.phaseInit || (this.stopMoving(), this.animDelay = 300, this.phaseTimer.start(1500), this.phaseInit = !0), this.phaseTimer.expired()) {
              this.nextPhase();
              break
            }
            this.position.x += horde.randomRange(-1, 1);
            break;
          case 5:
            this.phaseInit || (this.cooldown = !1, this.weapons = [{
              type: "e_bouncing_boulder",
              count: null
            }], this.phaseInit = !0), i.objectAttack(this), this.position.x += horde.randomRange(-1, 1), this.nextPhase();
            break;
          case 6:
            this.phaseInit || (this.speed = 50, this.weapons = [{
              type: "e_minotaur_trident",
              count: null
            }], this.cooldown = !0, this.phaseTimer.start(6e3), this.phaseInit = !0), this.phaseTimer.expired() && this.setPhase(4), i.objectAttack(this), t.chase.apply(this, arguments)
        }
      },
      onWallCollide: function() {
        2 === this.phase && this.nextPhase()
      }
    }, e.imp = {
      role: "monster",
      team: 1,
      speed: 100,
      hitPoints: 20,
      damage: 15,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 64,
      animated: !0,
      gibletSize: "medium",
      moveChangeElapsed: 0,
      moveChangeDelay: 3e3,
      soundDamage: "imp_damage",
      soundDies: "imp_dies",
      phase: 0,
      phaseInit: !1,
      lootTable: [{
        type: null,
        weight: 7
      }, {
        type: "item_food",
        weight: 1
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }],
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.moveChangeDelay = horde.randomRange(500, 1e3)
      },
      onKilled: function(e, t) {
        "projectile" === e.role && e.die();
        for (var i = 0; 2 > i; ++i) t.spawnObject(this, "dire_bat", horde.randomDirection(), !1)
      },
      onUpdate: function() {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.phaseInit = !0), this.position.y >= 50 && (this.phase++, this.phaseInit = !1);
            break;
          case 1:
            this.phaseInit || (this.speed = 50, this.animDelay = 400, this.phaseTimer.start(2500, 7500), this.phaseInit = !0), t.wander.apply(this, arguments), this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1);
            break;
          case 2:
            this.phaseInit || (this.speed = 150, this.animDelay = 150, this.phaseTimer.start(2500, 7500), this.phaseInit = !0), t.wander.apply(this.arguments), this.phaseTimer.expired() && (this.phase = 1, this.phaseInit = !1)
        }
      }
    }, e.wizard = {
      role: "monster",
      team: 1,
      speed: 100,
      hitPoints: 20,
      damage: 10,
      worth: 0,
      spriteSheet: "characters",
      spriteY: 416,
      animated: !0,
      gibletSize: "medium",
      moveChangeElapsed: 0,
      moveChangeDelay: 3e3,
      weapons: [{
        type: "e_shock_wave",
        count: null
      }],
      soundAttacks: "wizard_attacks",
      soundDisappear: "wizard_disappear",
      soundReappear: "wizard_reappear",
      soundDamage: "goblin_damage",
      soundDies: "goblin_dies",
      lootTable: [{
        type: null,
        weight: 6
      }, {
        type: "item_chest",
        weight: 2
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }],
      phase: 0,
      phaseInit: !1,
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.moveChangeDelay = horde.randomRange(500, 1e3), this.moveToY = horde.randomRange(50, 75)
      },
      onUpdate: function(e, i) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.phaseInit = !0), this.position.y >= this.moveToY && (this.phase++, this.phaseInit = !1);
            break;
          case 1:
            this.phaseInit || (this.animated = !1, this.stopMoving(), this.addState(horde.Object.states.INVINCIBLE), this.phaseTimer.start(1e3), this.phaseInit = !0, horde.sound.play(this.soundDisappear)), this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1);
            break;
          case 2:
            this.phaseInit || (this.speed = 500, this.addState(horde.Object.states.INVISIBLE), this.phaseTimer.start(horde.randomRange(1e3, 2e3)), this.phaseInit = !0);
            var s = this.boundingBox().center(),
              a = i.getPlayerObject().boundingBox().center(),
              o = a.clone().subtract(s).abs();
            t.wander.apply(this, arguments), this.phaseTimer.expired() && o.magnitude() > 90 && (this.phase++, this.phaseInit = !1);
            break;
          case 3:
            this.phaseInit || (this.stopMoving(), this.removeState(horde.Object.states.INVISIBLE), this.phaseTimer.start(1e3), this.phaseInit = !0, horde.sound.play(this.soundReappear)), this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1);
            break;
          case 4:
            this.phaseInit || (this.speed = 0, this.animated = !0, this.removeState(horde.Object.states.INVINCIBLE), this.phaseTimer.start(horde.randomRange(2e3, 3e3)), this.phaseInit = !0, this.shotOnce = !1);
            var n = i.getPlayerObject();
            if (this.chase(n), this.phaseTimer.expired() && (this.phase = 1, this.phaseInit = !1), !this.shotOnce) return this.shotOnce = !0, "shoot"
        }
      }
    }, e.sandworm = {
      role: "monster",
      team: 1,
      animated: !0,
      animDelay: 200,
      spriteSheet: "characters",
      spriteY: 480,
      spawnFramesX: 544,
      spawnFramesY: 448,
      spawnFrameCount: 2,
      damage: 25,
      hitPoints: 50,
      speed: 50,
      worth: 0,
      phase: 0,
      phaseInit: !1,
      moveChangeElapsed: 0,
      moveChangeDelay: 2e3,
      soundAttacks: "sandworm_attacks",
      soundDamage: "goblin_damage",
      soundDies: "sandworm_dies",
      lootTable: [{
        type: null,
        weight: 4
      }, {
        type: "item_chest",
        weight: 2
      }, {
        type: "WEAPON_DROP",
        weight: 2
      }, {
        type: "item_food",
        weight: 2
      }],
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.dirtTimer = new horde.Timer, this.attackTimer = new horde.Timer
      },
      onUpdate: function(e, i) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.speed = 50, this.addState(horde.Object.states.INVISIBLE), this.phaseTimer.start(horde.randomRange(5e3, 1e4)), this.dirtTimer.start(150), this.phaseInit = !0), this.dirtTimer.update(e), this.position.y <= 50 ? this.setDirection(horde.directions.toVector(horde.directions.DOWN)) : t.wander.apply(this, arguments), this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1), this.dirtTimer.expired() && (i.spawnObject(this, "e_dirt_pile"), this.dirtTimer.reset());
            break;
          case 1:
            this.phaseInit || (this.stopMoving(), this.speed = 0, this.removeState(horde.Object.states.INVISIBLE), this.addState(horde.Object.states.SPAWNING), this.spawnFrameIndex = 0, this.phaseInit = !0), this.hasState(horde.Object.states.SPAWNING) || (this.phase++, this.phaseInit = !1);
            break;
          case 2:
            this.phaseInit || (this.phaseAttacks = 0, this.phaseInit = !0, this.attackTimer.start(200)), this.attackTimer.update(e), this.phaseAttacks < 1 && this.attackTimer.expired() && (this.phaseAttacks++, this.setDirection(horde.randomDirection()), i.spawnObject(this, "e_worm_spit"), horde.sound.play(this.soundAttacks), this.attackTimer.reset(), 1 === this.phaseAttacks && this.phaseTimer.start(2e3)), this.phaseAttacks >= 1 && this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1);
            break;
          case 3:
            this.phaseInit || (this.addState(horde.Object.states.DESPAWNING), this.spawnFrameIndex = 2, this.phaseInit = !0), this.hasState(horde.Object.states.DESPAWNING) || (this.addState(horde.Object.states.INVISIBLE), this.phase = 0, this.phaseInit = !1)
        }
      }
    }, e.doppelganger = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      spriteSheet: "characters",
      spriteY: 0,
      spriteY: 768,
      spriteYOverlay: 928,
      damage: 20,
      hitPoints: 5e3,
      speed: 200,
      soundAttacks: "dopp_attacks",
      soundDamage: "dopp_damage",
      soundDies: "dopp_dies",
      onInit: function() {
        this.phaseTimer = new horde.Timer
      },
      onKilled: function(e, t) {
        for (var i in t.objects) {
          var s = t.objects[i];
          "monster" === s.role && s.id !== this.id ? s.wound(s.hitPoints) : "trap" === s.role && (s.ttl = 1500)
        }
      },
      onUpdate: function(e, t) {
        switch (this.phase) {
          case 0:
            this.phaseInit || (this.speed = 300, this.animDelay = 100, this.phaseInit = !0), this.position.y > 100 && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (this.speed = 200, this.animDelay = 200, this.waypoints = this.getPattern(), this.currentWaypoint = this.waypoints.shift(), this.phaseInit = !0), this.moveToward(this.currentWaypoint);
            var i = this.currentWaypoint.clone().subtract(this.position).abs().magnitude();
            10 > i && (this.position = this.currentWaypoint.clone(), this.nextPhase());
            break;
          case 2:
            this.phaseInit || (this.setDirection(new horde.Vector2(0, 1)), this.stopMoving(), this.phaseTimer.start(500), this.phaseInit = !0), this.position.x += horde.randomRange(-1, 1), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 3:
            if (this.phaseInit || (this.currentWaypoint = this.waypoints.shift(), this.speed = 400, this.animDelay = 100, this.phaseInit = !0, this.spikeTimer = new horde.Timer, this.spikeTimer.start(200)), this.spikeTimer.update(e), this.spikeTimer.expired()) {
              horde.sound.play("spike_attack");
              var s = t.spawnObject(this, "spikes"),
                a = t.objects[s];
              a && (a.ttl = 1e4), this.spikeTimer.reset()
            }
            this.moveToward(this.currentWaypoint);
            var i = this.currentWaypoint.clone().subtract(this.position).abs().magnitude();
            10 > i && (this.position = this.currentWaypoint.clone(), this.waypoints.length > 0 ? this.currentWaypoint = this.waypoints.shift() : this.nextPhase());
            break;
          case 4:
            this.phaseInit || (this.speed = 100, this.animDelay = 200, this.phaseTimer.start(7500), this.phaseInit = !0);
            var o = t.getPlayerObject();
            o.wounds < o.hitPoints && this.chase(o), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 5:
            this.phaseInit || (this.speed = 200, this.animDelay = 200, this.phaseInit = !0, this.targetPos = new horde.Vector2(32, 66)), this.moveToward(this.targetPos);
            var i = this.targetPos.clone().subtract(this.position).abs().magnitude();
            10 > i && (this.position = this.targetPos.clone(), this.nextPhase());
            break;
          case 6:
            if (this.phaseInit || (this.setDirection(new horde.Vector2(0, 1)), this.stopMoving(), this.phaseInit = !0, this.makeSpikeWalls(t), this.weapons = [{
                type: "e_dopp_sword",
                count: null
              }]), this.phaseTimer.expired() && this.nextPhase(), this.chase(t.getPlayerObject()), this.stopMoving(), this.wounds > .33 * this.hitPoints) return "shoot";
            break;
          case 7:
            if (this.phaseInit || (this.stopMoving(), this.phaseTimer.start(4e3), this.phaseInit = !0), this.phaseTimer.expired()) {
              var n = horde.makeObject("item_food");
              n.position.x = 32, n.position.y = 64, t.addObject(n), this.nextPhase()
            }
            break;
          case 8:
            this.phaseInit || (this.speed = 200, this.animDelay = 200, this.weapons = [{
              type: "e_dopp_axe",
              count: null
            }], this.cooldown = !1, this.waypoints = this.getPattern(), this.currentWaypoint = this.waypoints.shift(), this.axeTimer = new horde.Timer, this.axeTimer.start(3e3), this.axeTimer.update(3e3), this.phaseInit = !0), this.axeTimer.update(e), this.axeTimer.expired() && (this.chase(t.getPlayerObject()), t.spawnObject(this, "e_dopp_axe"), this.axeTimer.reset()), this.moveToward(this.currentWaypoint);
            var i = this.currentWaypoint.clone().subtract(this.position).abs().magnitude();
            10 > i && (this.position = this.currentWaypoint.clone(), this.waypoints.length > 0 ? this.currentWaypoint = this.waypoints.shift() : this.nextPhase());
            break;
          case 9:
            this.phaseInit || (this.speed = 200, this.animDelay = 200, this.phaseInit = !0, this.targetPos = new horde.Vector2(304, 224)), this.moveToward(this.targetPos);
            var i = this.targetPos.clone().subtract(this.position).abs().magnitude();
            10 > i && (this.position = this.targetPos.clone(), this.nextPhase());
            break;
          case 10:
            if (!this.phaseInit) {
              horde.sound.play("minotaur_dies"), this.setDirection(new horde.Vector2(0, 1)), this.stopMoving(), this.phaseInit = !0;
              for (var r = 0; 60 > r; ++r) {
                var s = t.spawnObject(this, "dire_bat"),
                  a = t.objects[s];
                a.setDirection(horde.randomDirection()), a.addState(horde.Object.states.INVINCIBLE, 250)
              }
              this.phaseTimer.start(8e3)
            }
            this.phaseTimer.expired() && this.setPhase(1)
        }
      },
      getPattern: function() {
        switch (horde.randomRange(1, 3)) {
          case 1:
            return [new horde.Vector2(64, 320), new horde.Vector2(64, 96), new horde.Vector2(544, 96), new horde.Vector2(544, 320), new horde.Vector2(128, 320), new horde.Vector2(128, 160), new horde.Vector2(480, 160), new horde.Vector2(480, 256), new horde.Vector2(192, 256)];
          case 2:
            return [new horde.Vector2(576, 352), new horde.Vector2(32, 352), new horde.Vector2(32, 288), new horde.Vector2(576, 288), new horde.Vector2(576, 224), new horde.Vector2(32, 224), new horde.Vector2(32, 160), new horde.Vector2(576, 160), new horde.Vector2(576, 96), new horde.Vector2(32, 96)];
          case 3:
            return [new horde.Vector2(576, 64), new horde.Vector2(32, 64), new horde.Vector2(288, 192), new horde.Vector2(32, 352), new horde.Vector2(576, 352), new horde.Vector2(352, 224), new horde.Vector2(576, 64)]
        }
      },
      makeSpikeWalls: function(e) {
        horde.sound.play("wizard_reappear");
        var t = 3,
          i = 5e3,
          s = 2;
        this.wounds > .66 * this.hitPoints ? (t = 1, i = 5e3, s = 2) : this.wounds > .33 * this.hitPoints && (t = 2, i = 7500, s = 1.5), this.phaseTimer.start(i - 1500);
        for (var a = [], o = 0; 18 > o; ++o) a.push(!0);
        for (var n = 0; t > n; ++n) {
          for (var r = 0, h = !1; h === !1;) r = horde.randomRange(3, a.length - 1), h = a[r] === !0;
          a[r] = !1
        }
        for (var d = 0; d < a.length; ++d)
          if (a[d] === !0) {
            var p = horde.makeObject("spike_wall");
            p.position = new horde.Vector2(32 + 32 * d, 64), p.spinUpTime = i, p.speed *= s, e.addObject(p)
          } for (var a = [], o = 0; 10 > o; ++o) a.push(!0);
        for (var n = 0; t > n; ++n) {
          for (var r = 0, h = !1; h === !1;) r = horde.randomRange(3, a.length - 1), h = a[r] === !0;
          a[r] = !1
        }
        for (var d = 0; d < a.length; ++d)
          if (a[d] === !0) {
            var p = horde.makeObject("spike_wall");
            p.position = new horde.Vector2(32, 64 + 32 * d), p.wallDirection = new horde.Vector2(1, 0), p.spinUpTime = i, p.speed = 275, p.speed *= s, e.addObject(p)
          }
      }
    }, e.e_dopp_axe = {
      role: "projectile",
      cooldown: 2500,
      speed: 250,
      hitPoints: 1 / 0,
      damage: 15,
      spriteSheet: "objects",
      spriteX: 160,
      spriteY: 32,
      rotate: !0,
      rotateSpeed: 700,
      priority: 5,
      ttl: 1e4,
      soundAttacks: "dopp_attacks",
      onInit: function() {
        this.spawnTimer = new horde.Timer, this.spawnTimer.start(50)
      },
      onUpdate: function(e, t) {
        t.objectExists(this.ownerId) || this.die(), this.spawnTimer.update(e), this.spawnTimer.expired() && (t.spawnObject(this, "e_dopp_fire"), this.spawnTimer.reset())
      }
    }, e.e_dopp_sword = {
      role: "projectile",
      cooldown: 750,
      speed: 350,
      hitPoints: 1 / 0,
      damage: 5,
      spriteSheet: "objects",
      spriteX: 384,
      spriteY: 544,
      spriteAlign: !0,
      priority: 2,
      bounce: !1,
      piercing: !0,
      soundAttacks: "dopp_attacks",
      onInit: function() {
        this.spawnTimer = new horde.Timer, this.spawnTimer.start(50)
      },
      onUpdate: function(e, t) {
        this.spawnTimer.update(e), this.spawnTimer.expired() && (t.spawnObject(this, "e_dopp_fire"), this.spawnTimer.reset())
      }
    }, e.beholder = {
      role: "monster",
      team: 1,
      badass: !0,
      size: new horde.Size(128, 128),
      spriteSheet: "beholder",
      animated: !0,
      animDelay: 350,
      drawIndex: 3,
      damage: 30,
      hitPoints: 3e3,
      speed: 50,
      soundDamage: "beholder_damage",
      soundDies: "beholder_dies",
      collidable: !1,
      lootTable: [{
        type: "item_weapon_fire_sword",
        weight: 1
      }],
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.attackTimer = new horde.Timer, this.eyeletOffset = 100, this.eyeletOffsetMod = 1, this.enraged = !1
      },
      onUpdate: function(e, i) {
        if (this.attackTimer.update(e), this.attackTimer.expired()) {
          horde.sound.play("wizard_attacks");
          var s = i.spawnObject(this, "e_energy_ball"),
            a = i.objects[s];
          a.chase(i.getPlayerObject()), this.attackTimer.reset()
        }
        switch (this.eyeletOffset += .02 * e * this.eyeletOffsetMod, this.eyeletOffset > 120 && (this.eyeletOffsetMod = -1), this.eyeletOffset < 100 && (this.eyeletOffsetMod = 1), this.wounds > this.hitPoints / 2 && !this.enraged && (this.enraged = !0, this.speed *= 1.5, this.animDelay /= 2, this.attackTimer.start(2e3)), this.phase) {
          case 0:
            this.phaseInit || (this.speed = 200, this.addState(horde.Object.states.INVISIBLE), this.phaseInit = !0), this.position.y >= 70 && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (horde.sound.play("wizard_reappear"), this.speed = 50, this.removeState(horde.Object.states.INVISIBLE), this.addState(horde.Object.states.INVINCIBLE), this.phaseTimer.start(2e3), this.phaseInit = !0), t.wander.apply(this, arguments), this.phaseTimer.expired() && (this.attackTimer.start(4e3), this.nextPhase());
            break;
          case 2:
            if (this.phaseInit || (this.removeState(horde.Object.states.INVINCIBLE), this.collidable = !0, this.eyeletTimer = new horde.Timer, this.eyeletTimer.start(500), this.eyeletsSpawned = 0, this.phaseInit = !0), this.eyeletTimer.update(e), t.wander.apply(this, arguments), this.eyeletTimer.expired()) {
              horde.sound.play("wizard_reappear"), this.eyeletTimer.reset();
              var s = i.spawnObject(this, "eyelet");
              if (this.wounds > this.hitPoints / 2) {
                var a = i.objects[s];
                a.makeBadass()
              }++this.eyeletsSpawned, this.eyeletsSpawned >= 12 && this.nextPhase()
            }
            break;
          case 3:
            this.phaseInit || (this.phaseTimer.start(2e4), this.phaseInit = !0);
            var o = !1;
            for (var s in i.objects)
              if (i.objects[s].ownerId === this.id) {
                o = !0;
                break
              }(this.phaseTimer.expired() || !o) && this.nextPhase(), t.wander.apply(this, arguments);
            break;
          case 4:
            this.phaseInit || (this.stopMoving(), this.phaseTimer.start(2e3), this.phaseInit = !0), this.position.x += horde.randomRange(-2, 2), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 5:
            for (var n = 0; 2 > n; ++n) i.spawnObject(this, "gas_cloud");
            this.nextPhase();
            break;
          case 6:
            this.phaseInit || (this.oldSpeed = this.speed, this.speed = 250, this.oldAnimDelay = this.animDelay, this.animDelay = 100, this.chase(i.getPlayerObject()), this.phaseTimer.start(1e3), this.phaseInit = !0)
        }
      },
      onWallCollide: function() {
        6 === this.phase && this.phaseTimer.expired() && (this.speed = this.oldSpeed, this.animDelay = this.oldAnimDelay, this.setPhase(2))
      }
    }, e.gas_cloud = {
      role: "trap",
      team: 1,
      animated: !0,
      size: new horde.Size(128, 128),
      spriteSheet: "characters",
      spriteX: 640,
      spriteY: 416,
      drawIndex: 2,
      animDelay: 400,
      damage: 20,
      hitPoints: 9999,
      speed: 10,
      ttl: 9e4,
      damageType: "magic",
      onInit: function() {
        this.setDirection(horde.randomDirection()), this.moveChangeDelay = horde.randomRange(5e3, 1e4)
      },
      onUpdate: function(e, i) {
        2 === this.animFrameIndex && (this.animated = !1, this.spriteX = 896), 1 === this.team && !i.objects[this.ownerId] && this.ttl - this.ttlElapsed > 2e3 && (this.ttlElapsed = this.ttl - 2e3), t.wander.apply(this, arguments)
      },
      onObjectCollide: function(e) {
        e.team !== this.team && "projectile" !== e.role && e.addState(horde.Object.states.SLOWED, 300), 3 !== this.team && "magic" == e.damageType && (horde.sound.play("fire_attack"), this.ownerId = null, this.team = 3, this.damage = 5, this.ttl = 2e3, this.ttlElapsed = 0, this.spriteY += 224, this.animDelay = 500, this.animFrameIndex = 0, this.animNumFrames = 3)
      }
    }, e.dragon = {
      role: "monster",
      team: 1,
      badass: !0,
      animated: !0,
      gibletSize: "large",
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteY: 352,
      moveChangeElapsed: 0,
      moveChangeDelay: 0,
      damage: 20,
      hitPoints: 1e3,
      speed: 20,
      worth: 0,
      soundAttacks: "dragon_attacks",
      soundDamage: "dragon_damage",
      soundDies: "dragon_dies",
      weapons: [{
        type: "e_fireball",
        count: null
      }],
      lootTable: [{
        type: "item_gold_chest",
        weight: 1
      }],
      phase: 0,
      phaseInit: !1,
      onInit: function() {
        this.phaseTimer = new horde.Timer, this.moveChangeDelay = horde.randomRange(500, 1e3), this.setDirection(horde.directions.toVector(horde.directions.DOWN)), this.altTimer = new horde.Timer
      },
      onUpdate: function(e, t) {
        switch (this.altTimer.update(e), this.phase) {
          case 0:
            this.phaseInit || (this.speed = 200, this.animDelay = 50, this.phaseInit = !0), this.position.y >= 200 && (this.phase++, this.phaseInit = !1);
            break;
          case 1:
            this.phaseInit || (this.stopMoving(), this.animDelay = 300, this.phaseTimer.start(1e3), this.phaseInit = !0), this.position.x += horde.randomRange(-1, 1), this.phaseTimer.expired() && this.nextPhase();
            break;
          case 2:
            this.phaseInit || (this.cooldown = !1, this.stopMoving(), this.weapons = [{
              type: "e_ring_fire",
              count: null
            }], this.phaseInit = !1), t.objectAttack(this), this.nextPhase();
            break;
          case 3:
            this.phaseInit || (this.speed = 0, this.animDelay = 100, this.phaseTimer.start(2e3), this.phaseInit = !0, this.altTimer.start(350), this.followUpShot = !1), !this.followUpShot && this.altTimer.expired() && this.wounds > this.hitPoints / 2 && (this.cooldown = !1, this.weapons = [{
              type: "e_ring_fire_dopp",
              count: null
            }], t.objectAttack(this), this.followUpShot = !0), this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1), this.position.x += horde.randomRange(-1, 1);
            break;
          case 4:
            if (!this.phaseInit) {
              this.speed = 350, this.animDelay = 100, this.phaseTimer.start(500), this.phaseInit = !0;
              var i = t.getPlayerObject();
              this.chase(i)
            }
            this.phaseTimer.expired() && (this.phase++, this.phaseInit = !1);
            break;
          case 5:
            this.phaseInit || (this.speed = 0, this.animDelay = 400, this.weapons = [{
              type: "e_fireball_green",
              count: null
            }], this.cooldown = !1, this.cooldownElapsed = 0, this.phaseTimer.start(2500), this.phaseInit = !0, this.altTimer.start(750)), this.phaseTimer.expired() && (this.phase = 2, this.phaseInit = !1);
            var i = t.getPlayerObject();
            return this.chase(i), this.altTimer.expired() && this.wounds > this.hitPoints / 2 && (t.spawnObject(this, "e_fireball"), this.altTimer.reset()), "shoot"
        }
      }
    }, e.e_arrow = {
      role: "projectile",
      cooldown: 4e3,
      speed: 200,
      hitPoints: 1,
      damage: 5,
      spriteSheet: "objects",
      spriteX: 256,
      spriteY: 0,
      spriteAlign: !0,
      bounce: !1
    }, e.e_trident = {
      role: "projectile",
      cooldown: 5e3,
      speed: 200,
      hitPoints: 1,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 160,
      spriteY: 0,
      spriteAlign: !0,
      bounce: !1
    }, e.e_boulder = {
      role: "projectile",
      cooldown: 2e3,
      speed: 150,
      hitPoints: 1 / 0,
      damage: 15,
      spriteSheet: "objects",
      spriteX: 224,
      spriteY: 0,
      rotate: !0,
      bounce: !1
    }, e.e_bouncing_boulder = {
      role: "projectile",
      cooldown: 1500,
      speed: 150,
      hitPoints: 1 / 0,
      damage: 15,
      spriteSheet: "objects",
      spriteX: 224,
      spriteY: 0,
      rotate: !0,
      bounce: !0,
      ttl: 5e3
    }, e.e_minotaur_trident = {
      role: "projectile",
      cooldown: 2e3,
      speed: 200,
      hitPoints: 1 / 0,
      damage: 20,
      spriteAlign: !0,
      spriteSheet: "objects",
      spriteX: 160,
      spriteY: 0,
      bounce: !1
    }, e.e_energy_ball = {
      role: "projectile",
      cooldown: 2e3,
      speed: 200,
      hitPoints: 1 / 0,
      damage: 25,
      spriteSheet: "objects",
      spriteX: 320,
      spriteY: 0,
      rotate: !0,
      bounce: !1
    }, e.e_ring_fire = {
      role: "projectile",
      cooldown: 2e3,
      speed: 200,
      hitPoints: 1 / 0,
      damage: 20,
      spriteSheet: "objects",
      spriteX: 352,
      spriteY: 0,
      rotate: !0,
      bounce: !1,
      damageType: "magic"
    }, e.e_ring_fire_dopp = {
      role: "projectile",
      cooldown: 2e3,
      speed: 150,
      hitPoints: 1 / 0,
      damage: 25,
      spriteSheet: "objects",
      spriteX: 352,
      spriteY: 544,
      rotate: !0,
      bounce: !1,
      damageType: "magic"
    }, e.e_fireball = {
      role: "projectile",
      cooldown: 2e3,
      speed: 350,
      hitPoints: 1 / 0,
      damage: 20,
      spriteSheet: "objects",
      spriteX: 352,
      spriteY: 544,
      rotate: !0,
      bounce: !1,
      damageType: "magic"
    }, e.e_fireball_green = {
      role: "projectile",
      cooldown: 75,
      speed: 350,
      hitPoints: 1 / 0,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 352,
      spriteY: 0,
      rotate: !0,
      ttl: 400,
      bounce: !1,
      damageType: "magic"
    }, e.e_static_blue_fire = {
      role: "projectile",
      cooldown: 100,
      speed: 0,
      hitPoints: 1 / 0,
      damage: 5,
      spriteSheet: "objects",
      spriteX: 288,
      spriteY: 32,
      rotate: !0,
      rotateSpeed: 100,
      ttl: 1e3,
      bounce: !1,
      drawIndex: 0,
      damageType: "magic"
    }, e.e_dopp_fire = {
      role: "projectile",
      cooldown: 200,
      speed: 0,
      hitPoints: 1 / 0,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 288,
      spriteY: 32,
      rotate: !0,
      rotateSpeed: 200,
      ttl: 250,
      bounce: !1,
      drawIndex: 0,
      damageType: "magic"
    }, e.e_static_green_fire = {
      role: "projectile",
      cooldown: 200,
      speed: 0,
      hitPoints: 1 / 0,
      damage: 10,
      size: new horde.Size(64, 64),
      spriteSheet: "objects",
      spriteX: 64,
      spriteY: 192,
      rotate: !0,
      rotateSpeed: 150,
      ttl: 2e3,
      bounce: !1,
      drawIndex: 0,
      damageType: "magic"
    }, e.e_dirt_pile = {
      role: "trap",
      cooldown: 100,
      speed: 0,
      hitPoints: 1 / 0,
      damage: 0,
      spriteSheet: "characters",
      spriteX: 0,
      spriteY: 448,
      ttl: 3e3,
      bounce: !1,
      drawIndex: -2,
      onInit: function() {
        horde.randomRange(1, 10) > 5 && (this.spriteX += 32)
      },
      onObjectCollide: function(e) {
        e.team !== this.team && "projectile" !== e.role && e.addState(horde.Object.states.SLOWED, 300)
      }
    }, e.e_spit_pool = {
      role: "trap",
      cooldown: 100,
      speed: 0,
      hitPoints: 9999,
      damage: 5,
      size: new horde.Size(64, 64),
      spriteSheet: "characters",
      spriteX: 896,
      spriteY: 416,
      animated: !0,
      ttl: 7500,
      bounce: !1,
      drawIndex: -1,
      collidable: !1,
      onObjectCollide: function(e) {
        e.team !== this.team && "projectile" !== e.role && e.addState(horde.Object.states.SLOWED, 300)
      }
    }, e.e_shock_wave = {
      role: "projectile",
      cooldown: 1e3,
      speed: 200,
      hitPoints: 1 / 0,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 224,
      spriteY: 32,
      spriteAlign: !0,
      bounce: !1,
      animated: !0,
      damageType: "magic"
    }, e.e_worm_spit = {
      role: "projectile",
      cooldown: 1e3,
      speed: 200,
      hitPoints: 1,
      damage: 10,
      spriteSheet: "objects",
      spriteX: 128,
      spriteY: 64,
      spriteAlign: !0,
      bounce: !1,
      animated: !0,
      damageType: "magic",
      onInit: function() {
        this.dieTimer = new horde.Timer, this.dieTimer.start(1e3)
      },
      onUpdate: function(e) {
        this.dieTimer.update(e), this.dieTimer.expired() && this.die()
      },
      onDelete: function(e) {
        e.spawnObject(this, "e_spit_pool")
      }
    }, e.mini_heart = {
      role: "fluff",
      spriteSheet: "objects",
      spriteX: 288,
      spriteY: 128,
      size: new horde.Size(10, 10),
      ttl: 600,
      speed: 75,
      collidable: !1,
      drawIndex: 5,
      onInit: function() {
        this.setDirection(new horde.Vector2(0, -1)), this.speed = horde.randomRange(55, 85)
      }
    }, e.mini_skull = {
      role: "fluff",
      spriteSheet: "objects",
      spriteX: 320,
      spriteY: 128,
      size: new horde.Size(10, 10),
      ttl: 1300,
      collidable: !1,
      drawIndex: 5,
      onInit: function() {
        this.setDirection(new horde.Vector2(0, -1)), this.speed = horde.randomRange(25, 60)
      }
    }, e.rose = {
      role: "fluff",
      spriteSheet: "objects",
      collidable: !1,
      rotate: !0,
      spriteX: 192,
      spriteY: 256,
      drawIndex: -1,
      onInit: function() {
        this.speed = horde.randomRange(150, 200), this.rotateSpeed = horde.randomRange(75, 100), this.phaseTimer = new horde.Timer
      },
      onUpdate: function() {
        switch (this.phase) {
          case 0:
            if (!this.phaseInit) {
              this.phaseInit = !0;
              var e = horde.randomRange(0, 5);
              this.direction.y = -(e / 10), this.phaseTimer.start(horde.randomRange(500, 1750))
            }
            this.direction.y += .01, this.phaseTimer.expired() && this.nextPhase();
            break;
          case 1:
            this.phaseInit || (this.stopMoving(), this.rotate = !1, this.phaseInit = !0)
        }
      }
    }, e.cloud = {
      role: "fluff",
      spriteSheet: "objects",
      collidable: !1,
      drawIndex: 10,
      onInit: function() {
        switch (this.alpha = .25, this.speed = horde.randomRange(5, 25), this.size = new horde.Size(192, 128), horde.randomRange(1, 4)) {
          case 1:
            this.spriteX = 0, this.spriteY = 288;
            break;
          case 2:
            this.size = new horde.Size(128, 96), this.spriteX = 192, this.spriteY = 288;
            break;
          case 3:
            this.spriteX = 0, this.spriteY = 416;
            break;
          case 4:
            this.size = new horde.Size(160, 128), this.spriteX = 192, this.spriteY = 416
        }
      }
    }, e.gate = {
      role: "fluff",
      speed: 25,
      spriteSheet: "objects",
      spriteX: 0,
      spriteY: 192,
      size: new horde.Size(64, 64)
    }, e.pickup_arrow = {
      role: "fluff",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 0,
      spriteY: 608,
      size: new horde.Size(118, 52),
      drawIndex: 9,
      animated: !0
    }, e.item_food = {
      role: "powerup_food",
      healAmount: 10,
      speed: 0,
      spriteSheet: "objects",
      spriteX: 96,
      spriteY: 32,
      ttl: 8e3
    }, e.item_coin = {
      role: "powerup_coin",
      coinAmount: 100,
      speed: 0,
      spriteSheet: "objects",
      spriteX: 64,
      spriteY: 32,
      ttl: 5e3
    }, e.item_chest = {
      role: "powerup_coin",
      coinAmount: 500,
      speed: 0,
      spriteSheet: "objects",
      spriteX: 32,
      spriteY: 32,
      ttl: 5e3
    }, e.item_gold_chest = {
      role: "powerup_coin",
      coinAmount: 5e3,
      speed: 0,
      spriteSheet: "objects",
      spriteX: 0,
      spriteY: 32
    }, e.item_weapon_knife = {
      role: "powerup_weapon",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 32,
      spriteY: 0,
      ttl: 5e3,
      wepType: "h_knife",
      wepCount: 125
    }, e.item_weapon_spear = {
      role: "powerup_weapon",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 96,
      spriteY: 0,
      ttl: 5e3,
      wepType: "h_spear",
      wepCount: 100
    }, e.item_weapon_fireball = {
      role: "powerup_weapon",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 0,
      ttl: 5e3,
      wepType: "h_fireball",
      wepCount: 100
    }, e.item_weapon_axe = {
      role: "powerup_weapon",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 192,
      spriteY: 32,
      ttl: 5e3,
      wepType: "h_axe",
      wepCount: 75
    }, e.item_weapon_fire_sword = {
      role: "powerup_weapon",
      speed: 0,
      spriteSheet: "objects",
      spriteX: 384,
      spriteY: 0,
      wepType: "h_fire_sword",
      wepCount: 5e3
    }
  }(),
  function() {
    horde.ImageLoader = function() {
      this.images = {}, this.numLoaded = 0, this.numImages = 0
    };
    var e = horde.ImageLoader.prototype;
    e.load = function(e, t, i) {
      this.callback = function() {
        t.call(i)
      };
      for (var s in e) this.numImages++, this.images[s] = new Image, horde.on("load", this.handleImageLoad, this.images[s], this), horde.on("error", this.handleImageError, this.images[s], this), this.images[s].src = e[s]
    }, e.increment = function() {
      this.numLoaded++, this.numLoaded >= this.numImages && this.callback()
    }, e.handleImageLoad = function() {
      this.increment()
    }, e.handleImageError = function() {
      this.increment()
    }, e.getImage = function(e) {
      return this.images[e] ? this.images[e] : !1
    }
  }(),
  function() {
    horde.SpawnPoint = function(e, t, i, s) {
      this.delay = 500, this.lastSpawnElapsed = 0, this.location = new horde.Rect(e, t, i, s), this.queue = []
    };
    var e = horde.SpawnPoint.prototype;
    e.update = function(e, t) {
      if (this.lastSpawnElapsed += e, this.lastSpawnElapsed >= this.delay || t === !0) {
        if (this.lastSpawnElapsed = 0, this.queue.length < 1) return !1;
        var i = this.queue.shift(),
          s = this.location,
          a = horde.makeObject(i);
        a.position.x = horde.randomRange(s.left, s.left + s.width - a.size.width), a.position.y = horde.randomRange(s.top, s.top + s.height - a.size.height);
        var o = a.direction.clone();
        return o.y = 1, a.setDirection(o), a
      }
      return !1
    }, e.queueSpawn = function(e, t) {
      t = Number(t) || 1;
      for (var i = 0; t > i; i++) this.queue.push(e)
    }
  }(),
  function() {
    horde.SpawnWave = function() {
      this.points = [], this.nextWaveTime = 2e4, this.bossWave = !1
    };
    var e = horde.SpawnWave.prototype;
    e.addSpawnPoint = function(e, t) {
      this.points.push({
        spawnPointId: e,
        delay: t,
        objects: []
      })
    }, e.addObjects = function(e, t, i) {
      var s = null;
      for (var a in this.points) this.points[a].spawnPointId === e && (s = this.points[a]);
      return null === s ? !1 : void s.objects.push({
        type: t,
        count: Math.floor(i)
      })
    }
  }(),
  function() {
    var e = new horde.Engine;
    e.run()
  }();
  // url = "wss://ucp-games-2021.azurewebsites.net/ws",
  // window.socket = new WebSocket(url),
  // window.socket.onopen = function(event){
  //   console.log("conexion exitosa");
  // };
  url = "wss://ucp-games-2021.azurewebsites.net/multiplayer";
  window.multiplayer = new WebSocket(url);

  window.playerID = localStorage.getItem('playerID'); 
  if (typeof window.playerID === 'undefined' || window.playerID == null)
  { 
    var playerIDValue = "player-"+ parseInt((Math.random() * (100000 - 1) + 1));
    localStorage.setItem('playerID', playerIDValue); 
    window.playerID = playerIDValue;
  };
  console.log("jugador: "+ window.playerID);


  window.multiplayer.onopen = function(event){
    console.log("conexion exitosa");
  };

  window.multiplayer.onmessage = function(event){
    var datos = JSON.parse(event.data);
    console.log(datos.players);
  };
  
  

  