webpackJsonp([1], [function(module, exports, __webpack_require__) {
    "use strict";
    function fetchConfig() {
        var initInjector = angular.injector(["ng"])
            , $http = initInjector.get("$http");
        return $http.get("/api/config").then(function(response) {
            appModule.constant("CONFIG", response.data)
        }, function(errorResponse) {
            console.error("Failed to load config")
        })
    }
    function bootstrapApplication() {
        angular.bootstrap(document, [appModule.name], {
            strictDi: !0
        })
    }
    var appModule = __webpack_require__(189);
    angular.element(document).ready(function() {
        fetchConfig().then(bootstrapApplication)
    })
}
    , , , , , , , function(module, exports) {
        "use strict";
        module.exports = {
            classes: {
                CONTROL_BASE: "mapboxgl-ctrl",
                CONTROL_PREFIX: "mapboxgl-ctrl-",
                CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
                CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
                CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
                CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
                CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
                CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
                CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
                CONTROL_GROUP: "mapboxgl-ctrl-group",
                ATTRIBUTION: "mapboxgl-ctrl-attrib",
                ACTIVE_BUTTON: "active",
                BOX_SELECT: "mapbox-gl-draw_boxselect"
            },
            sources: {
                HOT: "mapbox-gl-draw-hot",
                COLD: "mapbox-gl-draw-cold"
            },
            cursors: {
                ADD: "add",
                MOVE: "move",
                DRAG: "drag",
                POINTER: "pointer",
                NONE: "none"
            },
            types: {
                POLYGON: "polygon",
                LINE: "line_string",
                POINT: "point"
            },
            geojsonTypes: {
                FEATURE: "Feature",
                POLYGON: "Polygon",
                LINE_STRING: "LineString",
                POINT: "Point",
                FEATURE_COLLECTION: "FeatureCollection",
                MULTI_PREFIX: "Multi",
                MULTI_POINT: "MultiPoint",
                MULTI_LINE_STRING: "MultiLineString",
                MULTI_POLYGON: "MultiPolygon"
            },
            modes: {
                DRAW_LINE_STRING: "draw_line_string",
                DRAW_POLYGON: "draw_polygon",
                DRAW_POINT: "draw_point",
                SIMPLE_SELECT: "simple_select",
                DIRECT_SELECT: "direct_select",
                STATIC: "static"
            },
            events: {
                CREATE: "draw.create",
                DELETE: "draw.delete",
                UPDATE: "draw.update",
                SELECTION_CHANGE: "draw.selectionchange",
                MODE_CHANGE: "draw.modechange",
                ACTIONABLE: "draw.actionable",
                RENDER: "draw.render",
                COMBINE_FEATURES: "draw.combine",
                UNCOMBINE_FEATURES: "draw.uncombine"
            },
            updateActions: {
                MOVE: "move",
                CHANGE_COORDINATES: "change_coordinates"
            },
            meta: {
                FEATURE: "feature",
                MIDPOINT: "midpoint",
                VERTEX: "vertex"
            },
            activeStates: {
                ACTIVE: "true",
                INACTIVE: "false"
            },
            LAT_MIN: -90,
            LAT_RENDERED_MIN: -85,
            LAT_MAX: 90,
            LAT_RENDERED_MAX: 85,
            LNG_MIN: -270,
            LNG_MAX: 270
        }
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
        var freeGlobal = __webpack_require__(505)
            , freeSelf = "object" == typeof self && self && self.Object === Object && self
            , root = freeGlobal || freeSelf || Function("return this")();
        module.exports = root
    }
    , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
        "use strict";
        var Constants = __webpack_require__(7);
        module.exports = {
            isOfMetaType: function(type) {
                return function(e) {
                    var featureTarget = e.featureTarget;
                    return featureTarget && featureTarget.properties ? featureTarget.properties.meta === type : !1
                }
            },
            isShiftMousedown: function(e) {
                return e.originalEvent && e.originalEvent.shiftKey ? 0 === e.originalEvent.button : !1
            },
            isActiveFeature: function(e) {
                return e.featureTarget && e.featureTarget.properties ? e.featureTarget.properties.active === Constants.activeStates.ACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE : !1
            },
            isInactiveFeature: function(e) {
                return e.featureTarget && e.featureTarget.properties ? e.featureTarget.properties.active === Constants.activeStates.INACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE : !1
            },
            noTarget: function(e) {
                return void 0 === e.featureTarget
            },
            isFeature: function(e) {
                return e.featureTarget && e.featureTarget.properties ? e.featureTarget.properties.meta === Constants.meta.FEATURE : !1
            },
            isVertex: function(e) {
                var featureTarget = e.featureTarget;
                return featureTarget && featureTarget.properties ? featureTarget.properties.meta === Constants.meta.VERTEX : !1
            },
            isShiftDown: function(e) {
                return e.originalEvent ? e.originalEvent.shiftKey === !0 : !1
            },
            isEscapeKey: function(e) {
                return 27 === e.keyCode
            },
            isEnterKey: function(e) {
                return 13 === e.keyCode
            },
            "true": function() {
                return !0
            }
        }
    }
    , , , , , , function(module, exports, __webpack_require__) {
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : void 0
        }
        var baseIsNative = __webpack_require__(492)
            , getValue = __webpack_require__(509);
        module.exports = getNative
    }
    , , , function(module, exports, __webpack_require__) {
        "use strict";
        var hat = __webpack_require__(110)
            , Constants = __webpack_require__(7)
            , Feature = function(ctx, geojson) {
            this.ctx = ctx,
                this.properties = geojson.properties || {},
                this.coordinates = geojson.geometry.coordinates,
                this.id = geojson.id || hat(),
                this.type = geojson.geometry.type
        };
        Feature.prototype.changed = function() {
            this.ctx.store.featureChanged(this.id)
        }
            ,
            Feature.prototype.incomingCoords = function(coords) {
                this.setCoordinates(coords)
            }
            ,
            Feature.prototype.setCoordinates = function(coords) {
                this.coordinates = coords,
                    this.changed()
            }
            ,
            Feature.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.coordinates))
            }
            ,
            Feature.prototype.setProperty = function(property, value) {
                this.properties[property] = value
            }
            ,
            Feature.prototype.toGeoJSON = function() {
                return JSON.parse(JSON.stringify({
                    id: this.id,
                    type: Constants.geojsonTypes.FEATURE,
                    properties: this.properties,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }))
            }
            ,
            Feature.prototype.internal = function(mode) {
                var properties = {
                    id: this.id,
                    meta: Constants.meta.FEATURE,
                    "meta:type": this.type,
                    active: Constants.activeStates.INACTIVE,
                    mode: mode
                };
                if (this.ctx.options.userProperties)
                    for (name in this.properties)
                        properties["user_" + name] = this.properties[name];
                return {
                    type: Constants.geojsonTypes.FEATURE,
                    properties: properties,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }
            }
            ,
            module.exports = Feature
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Feature = __webpack_require__(57)
            , Constants = __webpack_require__(7)
            , hat = __webpack_require__(110)
            , models = {
            MultiPoint: __webpack_require__(80),
            MultiLineString: __webpack_require__(79),
            MultiPolygon: __webpack_require__(81)
        }
            , takeAction = function(features, action, path, lng, lat) {
            var parts = path.split(".")
                , idx = parseInt(parts[0], 10)
                , tail = parts[1] ? parts.slice(1).join(".") : null;
            return features[idx][action](tail, lng, lat)
        }
            , MultiFeature = function(ctx, geojson) {
            if (Feature.call(this, ctx, geojson),
                delete this.coordinates,
                this.model = models[geojson.geometry.type],
            void 0 === this.model)
                throw new TypeError(geojson.geometry.type + " is not a valid type");
            this.features = this._coordinatesToFeatures(geojson.geometry.coordinates)
        };
        MultiFeature.prototype = Object.create(Feature.prototype),
            MultiFeature.prototype._coordinatesToFeatures = function(coordinates) {
                var _this = this
                    , Model = this.model.bind(this);
                return coordinates.map(function(coords) {
                    return new Model(_this.ctx,{
                        id: hat(),
                        type: Constants.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            coordinates: coords,
                            type: _this.type.replace("Multi", "")
                        }
                    })
                })
            }
            ,
            MultiFeature.prototype.isValid = function() {
                return this.features.every(function(f) {
                    return f.isValid()
                })
            }
            ,
            MultiFeature.prototype.setCoordinates = function(coords) {
                this.features = this._coordinatesToFeatures(coords),
                    this.changed()
            }
            ,
            MultiFeature.prototype.getCoordinate = function(path) {
                return takeAction(this.features, "getCoordinate", path)
            }
            ,
            MultiFeature.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.features.map(function(f) {
                    return f.type === Constants.geojsonTypes.POLYGON ? f.getCoordinates() : f.coordinates
                })))
            }
            ,
            MultiFeature.prototype.updateCoordinate = function(path, lng, lat) {
                takeAction(this.features, "updateCoordinate", path, lng, lat),
                    this.changed()
            }
            ,
            MultiFeature.prototype.addCoordinate = function(path, lng, lat) {
                takeAction(this.features, "addCoordinate", path, lng, lat),
                    this.changed()
            }
            ,
            MultiFeature.prototype.removeCoordinate = function(path) {
                takeAction(this.features, "removeCoordinate", path),
                    this.changed()
            }
            ,
            MultiFeature.prototype.getFeatures = function() {
                return this.features
            }
            ,
            module.exports = MultiFeature
    }
    , function(module, exports) {
        "use strict";
        module.exports = {
            enable: function(ctx) {
                setTimeout(function() {
                    ctx.map && ctx.map.doubleClickZoom && ctx.map.doubleClickZoom.enable()
                }, 0)
            },
            disable: function(ctx) {
                setTimeout(function() {
                    ctx.map && ctx.map.doubleClickZoom && ctx.map.doubleClickZoom.disable()
                }, 0)
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function featuresAtClick(event, bbox, ctx) {
            return featuresAt(event, bbox, ctx, ctx.options.clickBuffer)
        }
        function featuresAtTouch(event, bbox, ctx) {
            return featuresAt(event, bbox, ctx, ctx.options.touchBuffer)
        }
        function featuresAt(event, bbox, ctx, buffer) {
            if (null === ctx.map)
                return [];
            var box = event ? mapEventToBoundingBox(event, buffer) : bbox
                , queryParams = {};
            ctx.options.styles && (queryParams.layers = ctx.options.styles.map(function(s) {
                return s.id
            }));
            var features = ctx.map.queryRenderedFeatures(box, queryParams).filter(function(feature) {
                return -1 !== META_TYPES.indexOf(feature.properties.meta)
            })
                , featureIds = new StringSet
                , uniqueFeatures = [];
            return features.forEach(function(feature) {
                var featureId = feature.properties.id;
                featureIds.has(featureId) || (featureIds.add(featureId),
                    uniqueFeatures.push(feature))
            }),
                sortFeatures(uniqueFeatures)
        }
        var sortFeatures = __webpack_require__(237)
            , mapEventToBoundingBox = __webpack_require__(234)
            , Constants = __webpack_require__(7)
            , StringSet = __webpack_require__(61)
            , META_TYPES = [Constants.meta.FEATURE, Constants.meta.MIDPOINT, Constants.meta.VERTEX];
        module.exports = {
            click: featuresAtClick,
            touch: featuresAtTouch
        }
    }
    , function(module, exports) {
        "use strict";
        function StringSet(items) {
            if (this._items = {},
                this._length = items ? items.length : 0,
                items)
                for (var i = 0, l = items.length; l > i; i++)
                    void 0 !== items[i] && (this._items[items[i]] = i)
        }
        StringSet.prototype.add = function(x) {
            return this._length = this._items[x] ? this._length : this._length + 1,
                this._items[x] = this._items[x] ? this._items[x] : this._length,
                this
        }
            ,
            StringSet.prototype.delete = function(x) {
                return this._length = this._items[x] ? this._length - 1 : this._length,
                    delete this._items[x],
                    this
            }
            ,
            StringSet.prototype.has = function(x) {
                return void 0 !== this._items[x]
            }
            ,
            StringSet.prototype.values = function() {
                var _this = this
                    , orderedKeys = Object.keys(this._items).sort(function(a, b) {
                    return _this._items[a] - _this._items[b]
                });
                return orderedKeys
            }
            ,
            StringSet.prototype.clear = function() {
                return this._length = 0,
                    this._items = {},
                    this
            }
            ,
            module.exports = StringSet
    }
    , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
        function ListCache(entries) {
            var index = -1
                , length = entries ? entries.length : 0;
            for (this.clear(); ++index < length; ) {
                var entry = entries[index];
                this.set(entry[0], entry[1])
            }
        }
        var listCacheClear = __webpack_require__(521)
            , listCacheDelete = __webpack_require__(522)
            , listCacheGet = __webpack_require__(523)
            , listCacheHas = __webpack_require__(524)
            , listCacheSet = __webpack_require__(525);
        ListCache.prototype.clear = listCacheClear,
            ListCache.prototype.delete = listCacheDelete,
            ListCache.prototype.get = listCacheGet,
            ListCache.prototype.has = listCacheHas,
            ListCache.prototype.set = listCacheSet,
            module.exports = ListCache
    }
    , function(module, exports, __webpack_require__) {
        function assocIndexOf(array, key) {
            for (var length = array.length; length--; )
                if (eq(array[length][0], key))
                    return length;
            return -1
        }
        var eq = __webpack_require__(166);
        module.exports = assocIndexOf
    }
    , function(module, exports, __webpack_require__) {
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map
        }
        var isKeyable = __webpack_require__(519);
        module.exports = getMapData
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , nativeCreate = getNative(Object, "create");
        module.exports = nativeCreate
    }
    , function(module, exports) {
        function isObject(value) {
            var type = typeof value;
            return !!value && ("object" == type || "function" == type)
        }
        module.exports = isObject
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Feature = __webpack_require__(57)
            , LineString = function(ctx, geojson) {
            Feature.call(this, ctx, geojson)
        };
        LineString.prototype = Object.create(Feature.prototype),
            LineString.prototype.isValid = function() {
                return this.coordinates.length > 1
            }
            ,
            LineString.prototype.addCoordinate = function(path, lng, lat) {
                this.changed();
                var id = parseInt(path, 10);
                this.coordinates.splice(id, 0, [lng, lat])
            }
            ,
            LineString.prototype.getCoordinate = function(path) {
                var id = parseInt(path, 10);
                return JSON.parse(JSON.stringify(this.coordinates[id]))
            }
            ,
            LineString.prototype.removeCoordinate = function(path) {
                this.changed(),
                    this.coordinates.splice(parseInt(path, 10), 1)
            }
            ,
            LineString.prototype.updateCoordinate = function(path, lng, lat) {
                var id = parseInt(path, 10);
                this.coordinates[id] = [lng, lat],
                    this.changed()
            }
            ,
            module.exports = LineString
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Feature = __webpack_require__(57)
            , Point = function(ctx, geojson) {
            Feature.call(this, ctx, geojson)
        };
        Point.prototype = Object.create(Feature.prototype),
            Point.prototype.isValid = function() {
                return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1]
            }
            ,
            Point.prototype.updateCoordinate = function(pathOrLng, lngOrLat, lat) {
                3 === arguments.length ? this.coordinates = [lngOrLat, lat] : this.coordinates = [pathOrLng, lngOrLat],
                    this.changed()
            }
            ,
            Point.prototype.getCoordinate = function() {
                return this.getCoordinates()
            }
            ,
            module.exports = Point
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Feature = __webpack_require__(57)
            , Polygon = function(ctx, geojson) {
            Feature.call(this, ctx, geojson),
                this.coordinates = this.coordinates.map(function(ring) {
                    return ring.slice(0, -1)
                })
        };
        Polygon.prototype = Object.create(Feature.prototype),
            Polygon.prototype.isValid = function() {
                return 0 === this.coordinates.length ? !1 : this.coordinates.every(function(ring) {
                    return ring.length > 2
                })
            }
            ,
            Polygon.prototype.incomingCoords = function(coords) {
                this.coordinates = coords.map(function(ring) {
                    return ring.slice(0, -1)
                }),
                    this.changed()
            }
            ,
            Polygon.prototype.setCoordinates = function(coords) {
                this.coordinates = coords,
                    this.changed()
            }
            ,
            Polygon.prototype.addCoordinate = function(path, lng, lat) {
                this.changed();
                var ids = path.split(".").map(function(x) {
                    return parseInt(x, 10)
                })
                    , ring = this.coordinates[ids[0]];
                ring.splice(ids[1], 0, [lng, lat])
            }
            ,
            Polygon.prototype.removeCoordinate = function(path) {
                this.changed();
                var ids = path.split(".").map(function(x) {
                    return parseInt(x, 10)
                })
                    , ring = this.coordinates[ids[0]];
                ring && (ring.splice(ids[1], 1),
                ring.length < 3 && this.coordinates.splice(ids[0], 1))
            }
            ,
            Polygon.prototype.getCoordinate = function(path) {
                var ids = path.split(".").map(function(x) {
                    return parseInt(x, 10)
                })
                    , ring = this.coordinates[ids[0]];
                return JSON.parse(JSON.stringify(ring[ids[1]]))
            }
            ,
            Polygon.prototype.getCoordinates = function() {
                return this.coordinates.map(function(coords) {
                    return coords.concat([coords[0]])
                })
            }
            ,
            Polygon.prototype.updateCoordinate = function(path, lng, lat) {
                this.changed();
                var parts = path.split(".")
                    , ringId = parseInt(parts[0], 10)
                    , coordId = parseInt(parts[1], 10);
                void 0 === this.coordinates[ringId] && (this.coordinates[ringId] = []),
                    this.coordinates[ringId][coordId] = [lng, lat]
            }
            ,
            module.exports = Polygon
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Constants = __webpack_require__(7);
        module.exports = function(parentId, coordinates, path, selected) {
            return {
                type: Constants.geojsonTypes.FEATURE,
                properties: {
                    meta: Constants.meta.VERTEX,
                    parent: parentId,
                    coord_path: path,
                    active: selected ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE
                },
                geometry: {
                    type: Constants.geojsonTypes.POINT,
                    coordinates: coordinates
                }
            }
        }
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports) {
        var hat = module.exports = function(bits, base) {
                if (base || (base = 16),
                void 0 === bits && (bits = 128),
                0 >= bits)
                    return "0";
                for (var digits = Math.log(Math.pow(2, bits)) / Math.log(base), i = 2; digits === 1 / 0; i *= 2)
                    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
                for (var rem = digits - Math.floor(digits), res = "", i = 0; i < Math.floor(digits); i++) {
                    var x = Math.floor(Math.random() * base).toString(base);
                    res = x + res
                }
                if (rem) {
                    var b = Math.pow(base, rem)
                        , x = Math.floor(Math.random() * b).toString(base);
                    res = x + res
                }
                var parsed = parseInt(res, base);
                return parsed !== 1 / 0 && parsed >= Math.pow(2, bits) ? hat(bits, base) : res
            }
        ;
        hat.rack = function(bits, base, expandBy) {
            var fn = function(data) {
                var iters = 0;
                do {
                    if (iters++ > 10) {
                        if (!expandBy)
                            throw new Error("too many ID collisions, use more bits");
                        bits += expandBy
                    }
                    var id = hat(bits, base)
                } while (Object.hasOwnProperty.call(hats, id));
                return hats[id] = data,
                    id
            }
                , hats = fn.hats = {};
            return fn.get = function(id) {
                return fn.hats[id]
            }
                ,
                fn.set = function(id, value) {
                    return fn.hats[id] = value,
                        fn
                }
                ,
                fn.bits = bits || 128,
                fn.base = base || 16,
                fn
        }
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , root = __webpack_require__(33)
            , Map = getNative(root, "Map");
        module.exports = Map
    }
    , function(module, exports, __webpack_require__) {
        function cloneArrayBuffer(arrayBuffer) {
            var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
            return new Uint8Array(result).set(new Uint8Array(arrayBuffer)),
                result
        }
        var Uint8Array = __webpack_require__(480);
        module.exports = cloneArrayBuffer
    }
    , function(module, exports) {
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg))
            }
        }
        module.exports = overArg
    }
    , function(module, exports) {
        var isArray = Array.isArray;
        module.exports = isArray
    }
    , function(module, exports, __webpack_require__) {
        function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
        }
        var arrayLikeKeys = __webpack_require__(485)
            , baseKeys = __webpack_require__(493)
            , isArrayLike = __webpack_require__(167);
        module.exports = keys
    }
    , , function(module, exports) {
        module.exports = function(module) {
            return module.webpackPolyfill || (module.deprecate = function() {}
                ,
                module.paths = [],
                module.children = [],
                module.webpackPolyfill = 1),
                module
        }
    }
    , , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _appState = __webpack_require__(214)
            , _appState2 = _interopRequireDefault(_appState);
        exports.default = angular.module("emu.app-state", []).service("AppState", _appState2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _polygonService = __webpack_require__(217)
            , _polygonService2 = _interopRequireDefault(_polygonService)
            , _appState = __webpack_require__(119)
            , _appState2 = _interopRequireDefault(_appState);
        exports.default = angular.module("emu.polygon-service", [_appState2.default.name]).service("PolygonService", _polygonService2.default)
    }
    , function(module, exports) {
        "use strict";
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this
                    , args = arguments
                    , later = function() {
                    timeout = null,
                    immediate || func.apply(context, args)
                }
                    , callNow = immediate && !timeout;
                clearTimeout(timeout),
                    timeout = setTimeout(later, wait),
                callNow && func.apply(context, args)
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.default = debounce
    }
    , function(module, exports) {
        "use strict";
        function safeApply(scope, fn) {
            var phase = scope.$root.$$phase;
            "$apply" === phase || "$digest" === phase ? fn && "function" == typeof fn && fn() : scope.$apply(fn)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.default = safeApply
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var extent = __webpack_require__(471)
            , Constants = __webpack_require__(7)
            , LAT_MIN = Constants.LAT_MIN
            , LAT_MAX = Constants.LAT_MAX
            , LAT_RENDERED_MIN = Constants.LAT_RENDERED_MIN
            , LAT_RENDERED_MAX = Constants.LAT_RENDERED_MAX
            , LNG_MIN = Constants.LNG_MIN
            , LNG_MAX = Constants.LNG_MAX;
        module.exports = function(geojsonFeatures, delta) {
            var northInnerEdge = LAT_MIN
                , southInnerEdge = LAT_MAX
                , northOuterEdge = LAT_MIN
                , southOuterEdge = LAT_MAX
                , westEdge = LNG_MAX
                , eastEdge = LNG_MIN;
            geojsonFeatures.forEach(function(feature) {
                var bounds = extent(feature)
                    , featureSouthEdge = bounds[1]
                    , featureNorthEdge = bounds[3]
                    , featureWestEdge = bounds[0]
                    , featureEastEdge = bounds[2];
                featureSouthEdge > northInnerEdge && (northInnerEdge = featureSouthEdge),
                southInnerEdge > featureNorthEdge && (southInnerEdge = featureNorthEdge),
                featureNorthEdge > northOuterEdge && (northOuterEdge = featureNorthEdge),
                southOuterEdge > featureSouthEdge && (southOuterEdge = featureSouthEdge),
                westEdge > featureWestEdge && (westEdge = featureWestEdge),
                featureEastEdge > eastEdge && (eastEdge = featureEastEdge)
            });
            var constrainedDelta = delta;
            return northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX && (constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge),
            northOuterEdge + constrainedDelta.lat > LAT_MAX && (constrainedDelta.lat = LAT_MAX - northOuterEdge),
            southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN && (constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge),
            southOuterEdge + constrainedDelta.lat < LAT_MIN && (constrainedDelta.lat = LAT_MIN - southOuterEdge),
            westEdge + constrainedDelta.lng <= LNG_MIN && (constrainedDelta.lng += 360 * Math.ceil(Math.abs(constrainedDelta.lng) / 360)),
            eastEdge + constrainedDelta.lng >= LNG_MAX && (constrainedDelta.lng -= 360 * Math.ceil(Math.abs(constrainedDelta.lng) / 360)),
                constrainedDelta
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function createSupplementaryPoints(geojson) {
            function processLine(line, lineBasePath) {
                var firstPointString = ""
                    , lastVertex = null;
                line.forEach(function(point, pointIndex) {
                    var pointPath = void 0 !== lineBasePath && null !== lineBasePath ? lineBasePath + "." + pointIndex : String(pointIndex)
                        , vertex = createVertex(featureId, point, pointPath, isSelectedPath(pointPath));
                    if (options.midpoints && lastVertex) {
                        var midpoint = createMidpoint(featureId, lastVertex, vertex, options.map);
                        midpoint && supplementaryPoints.push(midpoint)
                    }
                    lastVertex = vertex;
                    var stringifiedPoint = JSON.stringify(point);
                    firstPointString !== stringifiedPoint && supplementaryPoints.push(vertex),
                    0 === pointIndex && (firstPointString = stringifiedPoint)
                })
            }
            function isSelectedPath(path) {
                return options.selectedPaths ? -1 !== options.selectedPaths.indexOf(path) : !1
            }
            function processMultiGeometry() {
                var subType = type.replace(Constants.geojsonTypes.MULTI_PREFIX, "");
                coordinates.forEach(function(subCoordinates, index) {
                    var subFeature = {
                        type: Constants.geojsonTypes.FEATURE,
                        properties: geojson.properties,
                        geometry: {
                            type: subType,
                            coordinates: subCoordinates
                        }
                    };
                    supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index))
                })
            }
            var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                , basePath = arguments.length <= 2 || void 0 === arguments[2] ? null : arguments[2]
                , _geojson$geometry = geojson.geometry
                , type = _geojson$geometry.type
                , coordinates = _geojson$geometry.coordinates
                , featureId = geojson.properties && geojson.properties.id
                , supplementaryPoints = [];
            return type === Constants.geojsonTypes.POINT ? supplementaryPoints.push(createVertex(featureId, coordinates, basePath, isSelectedPath(basePath))) : type === Constants.geojsonTypes.POLYGON ? coordinates.forEach(function(line, lineIndex) {
                processLine(line, null !== basePath ? basePath + "." + lineIndex : String(lineIndex))
            }) : type === Constants.geojsonTypes.LINE_STRING ? processLine(coordinates, basePath) : 0 === type.indexOf(Constants.geojsonTypes.MULTI_PREFIX) && processMultiGeometry(),
                supplementaryPoints
        }
        var createVertex = __webpack_require__(82)
            , createMidpoint = __webpack_require__(230)
            , Constants = __webpack_require__(7);
        module.exports = createSupplementaryPoints
    }
    , function(module, exports) {
        "use strict";
        module.exports = function(a, b) {
            var x = a.x - b.x
                , y = a.y - b.y;
            return Math.sqrt(x * x + y * y)
        }
    }
    , function(module, exports) {
        "use strict";
        function isEventAtCoordinates(event, coordinates) {
            return event.lngLat ? event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1] : !1
        }
        module.exports = isEventAtCoordinates
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var constrainFeatureMovement = __webpack_require__(123)
            , Constants = __webpack_require__(7);
        module.exports = function(features, delta) {
            var constrainedDelta = constrainFeatureMovement(features.map(function(feature) {
                return feature.toGeoJSON()
            }), delta);
            features.forEach(function(feature) {
                var currentCoordinates = feature.getCoordinates()
                    , moveCoordinate = function(coord) {
                    var point = {
                        lng: coord[0] + constrainedDelta.lng,
                        lat: coord[1] + constrainedDelta.lat
                    };
                    return [point.lng, point.lat]
                }
                    , moveRing = function(ring) {
                    return ring.map(function(coord) {
                        return moveCoordinate(coord)
                    })
                }
                    , moveMultiPolygon = function(multi) {
                    return multi.map(function(ring) {
                        return moveRing(ring)
                    })
                }
                    , nextCoordinates = void 0;
                feature.type === Constants.geojsonTypes.POINT ? nextCoordinates = moveCoordinate(currentCoordinates) : feature.type === Constants.geojsonTypes.LINE_STRING || feature.type === Constants.geojsonTypes.MULTI_POINT ? nextCoordinates = currentCoordinates.map(moveCoordinate) : feature.type === Constants.geojsonTypes.POLYGON || feature.type === Constants.geojsonTypes.MULTI_LINE_STRING ? nextCoordinates = currentCoordinates.map(moveRing) : feature.type === Constants.geojsonTypes.MULTI_POLYGON && (nextCoordinates = currentCoordinates.map(moveMultiPolygon)),
                    feature.incomingCoords(nextCoordinates)
            })
        }
    }
    , function(module, exports, __webpack_require__) {
        function area(input) {
            if ("FeatureCollection" === input.type) {
                for (var i = 0, sum = 0; i < input.features.length; i++)
                    input.features[i].geometry && (sum += geometryArea(input.features[i].geometry));
                return sum
            }
            return geometryArea("Feature" === input.type ? input.geometry : input)
        }
        var geometryArea = __webpack_require__(265).geometry;
        module.exports = area
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports) {
        function arrayReduce(array, iteratee, accumulator, initAccum) {
            var index = -1
                , length = array ? array.length : 0;
            for (initAccum && length && (accumulator = array[++index]); ++index < length; )
                accumulator = iteratee(accumulator, array[index], index, array);
            return accumulator
        }
        module.exports = arrayReduce
    }
    , function(module, exports, __webpack_require__) {
        function assignValue(object, key, value) {
            var objValue = object[key];
            hasOwnProperty.call(object, key) && eq(objValue, value) && (void 0 !== value || key in object) || (object[key] = value)
        }
        var eq = __webpack_require__(166)
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = assignValue
    }
    , function(module, exports, __webpack_require__) {
        function copyObject(source, props, object, customizer) {
            object || (object = {});
            for (var index = -1, length = props.length; ++index < length; ) {
                var key = props[index]
                    , newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
                assignValue(object, key, void 0 === newValue ? source[key] : newValue)
            }
            return object
        }
        var assignValue = __webpack_require__(160);
        module.exports = copyObject
    }
    , function(module, exports, __webpack_require__) {
        var overArg = __webpack_require__(113)
            , stubArray = __webpack_require__(545)
            , nativeGetSymbols = Object.getOwnPropertySymbols
            , getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
        module.exports = getSymbols
    }
    , function(module, exports) {
        function isHostObject(value) {
            var result = !1;
            if (null != value && "function" != typeof value.toString)
                try {
                    result = !!(value + "")
                } catch (e) {}
            return result
        }
        module.exports = isHostObject
    }
    , function(module, exports) {
        function isPrototype(value) {
            var Ctor = value && value.constructor
                , proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
            return value === proto
        }
        var objectProto = Object.prototype;
        module.exports = isPrototype
    }
    , function(module, exports) {
        function toSource(func) {
            if (null != func) {
                try {
                    return funcToString.call(func)
                } catch (e) {}
                try {
                    return func + ""
                } catch (e) {}
            }
            return ""
        }
        var funcProto = Function.prototype
            , funcToString = funcProto.toString;
        module.exports = toSource
    }
    , function(module, exports) {
        function eq(value, other) {
            return value === other || value !== value && other !== other
        }
        module.exports = eq
    }
    , function(module, exports, __webpack_require__) {
        function isArrayLike(value) {
            return null != value && isLength(value.length) && !isFunction(value)
        }
        var isFunction = __webpack_require__(168)
            , isLength = __webpack_require__(543);
        module.exports = isArrayLike
    }
    , function(module, exports, __webpack_require__) {
        function isFunction(value) {
            var tag = isObject(value) ? objectToString.call(value) : "";
            return tag == funcTag || tag == genTag
        }
        var isObject = __webpack_require__(78)
            , funcTag = "[object Function]"
            , genTag = "[object GeneratorFunction]"
            , objectProto = Object.prototype
            , objectToString = objectProto.toString;
        module.exports = isFunction
    }
    , function(module, exports) {
        module.exports.RADIUS = 6378137,
            module.exports.FLATTENING = 1 / 298.257223563,
            module.exports.POLAR_RADIUS = 6356752.3142
    }
    , function(module, exports) {
        function extend() {
            for (var target = {}, i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source)
                    hasOwnProperty.call(source, key) && (target[key] = source[key])
            }
            return target
        }
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, ".mapbox-gl-draw_ctrl-bottom-left,.mapbox-gl-draw_ctrl-top-left{margin-left:0;border-radius:0 4px 4px 0}.mapbox-gl-draw_ctrl-bottom-right,.mapbox-gl-draw_ctrl-top-right{margin-right:0;border-radius:4px 0 0 4px}.mapbox-gl-draw_ctrl-draw{background-color:rgba(0,0,0,.75);border-color:rgba(0,0,0,.9)}.mapbox-gl-draw_ctrl-draw>button{border-color:rgba(0,0,0,.9);color:hsla(0,0%,100%,.5);width:30px;height:30px}.mapbox-gl-draw_ctrl-draw>button:hover{background-color:rgba(0,0,0,.85);color:hsla(0,0%,100%,.75)}.mapbox-gl-draw_ctrl-draw>button.active,.mapbox-gl-draw_ctrl-draw>button.active:hover{background-color:rgba(0,0,0,.95);color:#fff}.mapbox-gl-draw_ctrl-draw-btn{background-repeat:no-repeat;background-position:50%}.mapbox-gl-draw_point{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJtYXJrZXIuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTYiICAgICBpbmtzY2FwZTpjeD0iMTQuMTY0MjUzIiAgICAgaW5rc2NhcGU6Y3k9IjguODg1NzIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0iZmFsc2UiICAgICB1bml0cz0icHgiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NTEiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjA4IiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjE5MCIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkMTk3MTUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhMTkxNzIiPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGUgLz4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZyAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwMzIuMzYyMikiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgZD0ibSAzNiwxMDQwLjM2MjIgYyA2ZS02LDMuMzA5MyAtNS45ODg2MTIsMTAgLTUuOTg4NjEyLDEwIDAsMCAtNS45OTg3NzYsLTYuNjY4IC02LjAxMTM0NSwtOS45NzcyIC0wLjAxMjU3LC0zLjMwOTIgMi42NTY1NzYsLTYuMDAzOSA1Ljk2NTc5MiwtNi4wMjI3IDMuMzA5MTg5LC0wLjAxOSA2LjAwODg0LDIuNjQ1MiA2LjAzMzk5Miw1Ljk1NDMiICAgICAgIGlkPSJwYXRoMTI1NjEiICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2Nzc2MiIC8+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDM0LjAwMDExNSwxMDQwLjM2MjIgYyAtNWUtNiwyLjIwNjIgLTMuOTkyNTIzLDcuMDAwMSAtMy45OTI1MjMsNy4wMDAxIDAsMCAtMy45OTkyOTEsLTQuNzc4NyAtNC4wMDc2NzksLTYuOTg0OSAtMC4wMDg0LC0yLjIwNjIgMS43NzEwODIsLTQuMDAyNyAzLjk3NzMxLC00LjAxNTMgMi4yMDYyMSwtMC4wMTMgNC4wMDYwMzcsMS43NjM1IDQuMDIyNzc3LDMuOTY5NyIgICAgICAgaWQ9InBhdGgxMjU2MyIgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Ik0gOS45NjY3OTY5LDEwMTQuMzYyMiBDIDYuNjU3NTgwOSwxMDE0LjM4MSAzLjk4NzQzLDEwMTcuMDc2NCA0LDEwMjAuMzg1NiBjIDAuMDEyNTY5LDMuMzA5MiA2LjAxMTcxOSw4Ljk3NjYgNi4wMTE3MTksOC45NzY2IDAsMCA1Ljk4ODI4NywtNS42OTA3IDUuOTg4MjgxLC05IGwgMCwtMC4wNDUgYyAtMC4wMjUxNSwtMy4zMDkxIC0yLjcyNDAxNCwtNS45NzQxIC02LjAzMzIwMzEsLTUuOTU1MSB6IG0gMC4wMDk3NywyIGMgMi4yMDYyMDYxLC0wLjAxMyA0LjAwNjY5MzEsMS43NjI2IDQuMDIzNDMzMSwzLjk2ODggbCAwLDAuMDMxIGMgLTVlLTYsMi4yMDYyIC0zLjk5MjE4OCw2IC0zLjk5MjE4OCw2IDAsMCAtMy45OTk0MjQsLTMuNzc4MiAtNC4wMDc4MTIsLTUuOTg0NCAtMC4wMDg0LC0yLjIwNjIgMS43NzAzMzQ1LC00LjAwMyAzLjk3NjU2MjUsLTQuMDE1NiB6IiAgICAgICBpZD0icGF0aDEyNTY4IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzY3NjY2Njc2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lIiAgICAgICBkPSJNIDEwIDIgQyA2LjY4NjI5MiAyIDQgNC42ODYzIDQgOCBDIDQgMTEuMzEzNyAxMCAxNyAxMCAxNyBDIDEwIDE3IDE2IDExLjMxMzcgMTYgOCBDIDE2IDQuNjg2MyAxMy4zMTM3MDggMiAxMCAyIHogTSAxMCA0IEMgMTIuMDcxMDY4IDQgMTMuNzUgNS42Nzg5IDEzLjc1IDcuNzUgQyAxMy43NSA5LjIwNTMyNzggMTEuOTMxMTEgMTEuNjQ0MzkzIDEwLjgzMDA3OCAxMyBMIDkuMTY5OTIxOSAxMyBDIDguMDY4ODkwMyAxMS42NDQzOTMgNi4yNSA5LjIwNTMyNzggNi4yNSA3Ljc1IEMgNi4yNSA1LjY3ODkgNy45Mjg5MzIgNCAxMCA0IHogIiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiICAgICAgIGlkPSJwYXRoMTczMDUiIC8+ICA8L2c+PC9zdmc+)}.mapbox-gl-draw_polygon{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJzcXVhcmUuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IiAgICAgaW5rc2NhcGU6Y3g9IjExLjY4MTYzNCIgICAgIGlua3NjYXBlOmN5PSI5LjI4NTcxNDMiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC41O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Im0gNSwxMDM5LjM2MjIgMCw2IDIsMiA2LDAgMiwtMiAwLC02IC0yLC0yIC02LDAgeiBtIDMsMCA0LDAgMSwxIDAsNCAtMSwxIC00LDAgLTEsLTEgMCwtNCB6IiAgICAgICBpZD0icmVjdDc3OTciICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjIiAvPiAgICA8Y2lyY2xlICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBpZD0icGF0aDQzNjQiICAgICAgIGN4PSI2IiAgICAgICBjeT0iMTA0Ni4zNjIyIiAgICAgICByPSIyIiAvPiAgICA8Y2lyY2xlICAgICAgIGlkPSJwYXRoNDM2OCIgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjYwMDAwMDAyO21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGN4PSIxNCIgICAgICAgY3k9IjEwNDYuMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBpZD0icGF0aDQzNzAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBjeD0iNiIgICAgICAgY3k9IjEwMzguMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNjAwMDAwMDI7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgaWQ9InBhdGg0MzcyIiAgICAgICBjeD0iMTQiICAgICAgIGN5PSIxMDM4LjM2MjIiICAgICAgIHI9IjIiIC8+ICA8L2c+PC9zdmc+)}.mapbox-gl-draw_line{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJsaW5lLnN2ZyI+ICA8ZGVmcyAgICAgaWQ9ImRlZnMxOTE2OSIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOnpvb209IjE2IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjg5ODc3NSIgICAgIGlua3NjYXBlOmN5PSI5LjU4OTAxNTIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEzLjUsMTAzNS44NjIyIGMgLTEuMzgwNzEyLDAgLTIuNSwxLjExOTMgLTIuNSwyLjUgMCwwLjMyMDggMC4wNDYxNCwwLjYyNDQgMC4xNTYyNSwwLjkwNjMgbCAtMy43NSwzLjc1IGMgLTAuMjgxODM2LC0wLjExMDIgLTAuNTg1NDIxLC0wLjE1NjMgLTAuOTA2MjUsLTAuMTU2MyAtMS4zODA3MTIsMCAtMi41LDEuMTE5MyAtMi41LDIuNSAwLDEuMzgwNyAxLjExOTI4OCwyLjUgMi41LDIuNSAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTAuMzIwOCAtMC4wNDYxNCwtMC42MjQ0IC0wLjE1NjI1LC0wLjkwNjIgbCAzLjc1LC0zLjc1IGMgMC4yODE4MzYsMC4xMTAxIDAuNTg1NDIxLDAuMTU2MiAwLjkwNjI1LDAuMTU2MiAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTEuMzgwNyAtMS4xMTkyODgsLTIuNSAtMi41LC0yLjUgeiIgICAgICAgaWQ9InJlY3Q2NDY3IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPiAgPC9nPjwvc3ZnPg==)}.mapbox-gl-draw_trash{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgaWQ9InN2ZzU3MzgiICAgdmVyc2lvbj0iMS4xIiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTErZGV2ZWwrb3N4bWVudSByMTI5MTEiICAgc29kaXBvZGk6ZG9jbmFtZT0idHJhc2guc3ZnIiAgIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZGVmcyAgICAgaWQ9ImRlZnM1NzQwIiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMjIuNjI3NDE3IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjEyODE4NCIgICAgIGlua3NjYXBlOmN5PSI4Ljg0NjEzMDciICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTAzMyIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIyMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQ1NzQ2IiAgICAgICBlbXBzcGFjaW5nPSI1IiAgICAgICB2aXNpYmxlPSJ0cnVlIiAgICAgICBlbmFibGVkPSJ0cnVlIiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45OTk5OTk4MjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEwLDEwMzUuNzc0MyBjIC0wLjc4NDkyNTMsOGUtNCAtMS40OTY4Mzc2LDAuNDYwNiAtMS44MjAzMTI1LDEuMTc1OCBsIC0zLjE3OTY4NzUsMCAtMSwxIDAsMSAxMiwwIDAsLTEgLTEsLTEgLTMuMTc5Njg4LDAgYyAtMC4zMjM0NzUsLTAuNzE1MiAtMS4wMzUzODcsLTEuMTc1IC0xLjgyMDMxMiwtMS4xNzU4IHogbSAtNSw0LjU4NzkgMCw3IGMgMCwxIDEsMiAyLDIgbCA2LDAgYyAxLDAgMiwtMSAyLC0yIGwgMCwtNyAtMiwwIDAsNS41IC0xLjUsMCAwLC01LjUgLTMsMCAwLDUuNSAtMS41LDAgMCwtNS41IHoiICAgICAgIGlkPSJyZWN0MjQzOS03IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiIC8+ICA8L2c+PC9zdmc+)}.mapbox-gl-draw_uncombine{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0idW5jb21iaW5lLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczU3NDAiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQ0MTAzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDE4NCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjMwMDMiCiAgICAgICB5MT0iMTAiCiAgICAgICB4Mj0iMzAxNyIKICAgICAgIHkyPSIxMCIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSwyLjYxNzE4NzRlLTYpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MTAzIj4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3A0MTA1IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowOyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDQxMDciIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IgogICAgIGlua3NjYXBlOmN4PSItMTAuMjczOTQ2IgogICAgIGlua3NjYXBlOmN5PSI2LjkzMDM0NCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjIwNzgiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTA1NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iOTAwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyOTYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBzaG93Z3VpZGVzPSJmYWxzZSIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiCiAgICAgaW5rc2NhcGU6YmJveC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LW5vZGVzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vdGhlcnM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtbm9kZXM9ImZhbHNlIj4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBpZD0iZ3JpZDU3NDYiCiAgICAgICBlbXBzcGFjaW5nPSIyIgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiCiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiCiAgICAgICBzcGFjaW5neD0iMC41cHgiCiAgICAgICBzcGFjaW5neT0iMC41cHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIG9wYWNpdHk9IjAuMDU4ODIzNTMiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgIGQ9Ik0gMTIuMDA1ODU5IDIgQyAxMS43NTAzNiAyIDExLjQ5NDYwNSAyLjA5NzE4NyAxMS4yOTg4MjggMi4yOTI5Njg4IEwgMTAuMzAyNzM0IDMuMjg5MDYyNSBDIDkuOTExMTgwNCAzLjY4MDYyNiA5LjkxMTE4MDQgNC4zMTE1NjE1IDEwLjMwMjczNCA0LjcwMzEyNSBMIDExLjMwMjczNCA1LjcwMTE3MTkgQyAxMS42OTQyODggNi4wOTI3MzU0IDEyLjMyMzI5IDYuMDkyNzM1NCAxMi43MTQ4NDQgNS43MDExNzE5IEwgMTMuNzEwOTM4IDQuNzA1MDc4MSBDIDE0LjEwMjQ5MSA0LjMxMzUxNDYgMTQuMTAyNDkxIDMuNjgyNTc5MSAxMy43MTA5MzggMy4yOTEwMTU2IEwgMTIuNzEyODkxIDIuMjkyOTY4OCBDIDEyLjUxNzExNCAyLjA5NzE4NyAxMi4yNjEzNTkgMiAxMi4wMDU4NTkgMiB6IE0gMTYuMDAxOTUzIDUuOTk0MTQwNiBDIDE1Ljc0NjQ2MyA1Ljk5NDE0MDYgMTUuNDkwNjkyIDYuMDkzMjczNSAxNS4yOTQ5MjIgNi4yODkwNjI1IEwgMTQuMjk4ODI4IDcuMjg1MTU2MiBDIDEzLjkwNzI4OSA3LjY3NjczNDIgMTMuOTA3Mjg5IDguMzA1Njg3NyAxNC4yOTg4MjggOC42OTcyNjU2IEwgMTUuMjk2ODc1IDkuNjk3MjY1NiBDIDE1LjY4ODQxNCAxMC4wODg4NDQgMTYuMzE5Mzk4IDEwLjA4ODg0NCAxNi43MTA5MzggOS42OTcyNjU2IEwgMTcuNzA3MDMxIDguNzAxMTcxOSBDIDE4LjA5ODU3MSA4LjMwOTU5MzkgMTguMDk4NTcxIDcuNjc4Njg3MyAxNy43MDcwMzEgNy4yODcxMDk0IEwgMTYuNzA4OTg0IDYuMjg5MDYyNSBDIDE2LjUxMzIxNSA2LjA5MzI3MzUgMTYuMjU3NDQzIDUuOTk0MTQwNiAxNi4wMDE5NTMgNS45OTQxNDA2IHogTSA5IDcgQyA4IDcgOCA4IDguNSA4LjUgQyA4LjgzMzMzMyA4LjgzMzMgOS41IDkuNSA5LjUgOS41IEwgOC41IDEwLjUgQyA4LjUgMTAuNSA4IDExIDguNSAxMS41IEMgOSAxMiA5LjUgMTEuNSA5LjUgMTEuNSBMIDEwLjUgMTAuNSBMIDExLjUgMTEuNSBDIDEyIDEyIDEzIDEyIDEzIDExIEwgMTMgNyBMIDkgNyB6IE0gNC4wNDg4MjgxIDEwLjAwMTk1MyBDIDMuNzkzMzA4NyAxMC4wMDE5NTMgMy41Mzc1ODkxIDEwLjA5OTEyOSAzLjM0MTc5NjkgMTAuMjk0OTIyIEwgMi4yOTg4MjgxIDExLjMzNzg5MSBDIDEuOTA3MjQzNyAxMS43Mjk0NzYgMS45MDcyNDM3IDEyLjM2MDM2OCAyLjI5ODgyODEgMTIuNzUxOTUzIEwgNy4yNDgwNDY5IDE3LjcwMTE3MiBDIDcuNjM5NjMxMyAxOC4wOTI3NTcgOC4yNzA1MjUgMTguMDkyNzU3IDguNjYyMTA5NCAxNy43MDExNzIgTCA5LjcwNTA3ODEgMTYuNjU4MjAzIEMgMTAuMDk2NjYzIDE2LjI2NjYxOCAxMC4wOTY2NjMgMTUuNjM1NzI2IDkuNzA1MDc4MSAxNS4yNDQxNDEgTCA0Ljc1NTg1OTQgMTAuMjk0OTIyIEMgNC41NjAwNjcyIDEwLjA5OTEyOSA0LjMwNDM0NzUgMTAuMDAxOTUzIDQuMDQ4ODI4MSAxMC4wMDE5NTMgeiAiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiCiAgICAgICBpZD0icmVjdDkxOTgiIC8+CiAgPC9nPgo8L3N2Zz4K)}.mapbox-gl-draw_combine{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iY29tYmluZS5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM1NzQwIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDEwMyIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQxODQiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIHgxPSIzMDAzIgogICAgICAgeTE9IjEwIgogICAgICAgeDI9IjMwMTciCiAgICAgICB5Mj0iMTAiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEsMi42MTcxODc0ZS02KSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDEwMyI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wNDEwNSIgLz4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MDsiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3A0MTA3IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjE2IgogICAgIGlua3NjYXBlOmN4PSIyLjQyMzAwNiIKICAgICBpbmtzY2FwZTpjeT0iMTIuMTczMTY1IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMjA3OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDU0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSI5MDAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjI5NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIHNob3dndWlkZXM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOmJib3gtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6b2JqZWN0LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLW90aGVycz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6c25hcC1ub2Rlcz0iZmFsc2UiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNTc0NiIKICAgICAgIGVtcHNwYWNpbmc9IjIiCiAgICAgICB2aXNpYmxlPSJ0cnVlIgogICAgICAgZW5hYmxlZD0idHJ1ZSIKICAgICAgIHNuYXB2aXNpYmxlZ3JpZGxpbmVzb25seT0idHJ1ZSIKICAgICAgIHNwYWNpbmd4PSIwLjVweCIKICAgICAgIHNwYWNpbmd5PSIwLjVweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4wNTg4MjM1MyIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE1NzQzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0xMDMyLjM2MjIpIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAxMi4wNTA3ODEgMiBDIDExLjc5NTI2MiAyIDExLjUzOTU0MiAyLjA5NzE3NjIgMTEuMzQzNzUgMi4yOTI5Njg4IEwgMTAuMjk4ODI4IDMuMzM3ODkwNiBDIDkuOTA3MjQzNyAzLjcyOTQ3NTcgOS45MDcyNDM3IDQuMzYwMzY4IDEwLjI5ODgyOCA0Ljc1MTk1MzEgTCAxNS4yNDgwNDcgOS43MDExNzE5IEMgMTUuNjM5NjMxIDEwLjA5Mjc1NyAxNi4yNzA1MjUgMTAuMDkyNzU3IDE2LjY2MjEwOSA5LjcwMTE3MTkgTCAxNy43MDcwMzEgOC42NTYyNSBDIDE4LjA5ODYxNiA4LjI2NDY2NDkgMTguMDk4NjE2IDcuNjMzNzcyNiAxNy43MDcwMzEgNy4yNDIxODc1IEwgMTIuNzU3ODEyIDIuMjkyOTY4OCBDIDEyLjU2MjAyIDIuMDk3MTc2MiAxMi4zMDYzMDEgMiAxMi4wNTA3ODEgMiB6IE0gOCA4IEMgNyA4IDcgOSA3LjUgOS41IEMgNy44MzMzMzMgOS44MzMzIDguNSAxMC41IDguNSAxMC41IEwgNy41IDExLjUgQyA3LjUgMTEuNSA3IDEyIDcuNSAxMi41IEMgOCAxMyA4LjUgMTIuNSA4LjUgMTIuNSBMIDkuNSAxMS41IEwgMTAuNSAxMi41IEMgMTEgMTMgMTIgMTMgMTIgMTIgTCAxMiA4IEwgOCA4IHogTSA0IDEwLjAwMzkwNiBDIDMuNzQ0NTEgMTAuMDAzOTA2IDMuNDkwNjkxNiAxMC4xMDMwMzkgMy4yOTQ5MjE5IDEwLjI5ODgyOCBMIDIuMjk4ODI4MSAxMS4yOTQ5MjIgQyAxLjkwNzI4ODggMTEuNjg2NSAxLjkwNzI4ODggMTIuMzE1NDUzIDIuMjk4ODI4MSAxMi43MDcwMzEgTCAzLjI5Njg3NSAxMy43MDcwMzEgQyAzLjY4ODQxNDQgMTQuMDk4NjA5IDQuMzE5Mzk4MSAxNC4wOTg2MDkgNC43MTA5Mzc1IDEzLjcwNzAzMSBMIDUuNzA3MDMxMiAxMi43MTA5MzggQyA2LjA5ODU3MDYgMTIuMzE5MzYgNi4wOTg1NzA2IDExLjY4ODQ1MyA1LjcwNzAzMTIgMTEuMjk2ODc1IEwgNC43MDcwMzEyIDEwLjI5ODgyOCBDIDQuNTExMjYxNiAxMC4xMDMwMzkgNC4yNTU0OSAxMC4wMDM5MDYgNCAxMC4wMDM5MDYgeiBNIDcuOTk2MDkzOCAxNCBDIDcuNzQwNTk0MiAxNCA3LjQ4NDgzOTUgMTQuMDk3MTg3IDcuMjg5MDYyNSAxNC4yOTI5NjkgTCA2LjI5NDkyMTkgMTUuMjg5MDYyIEMgNS45MDMzNjc5IDE1LjY4MDYyNiA1LjkwMzM2NzkgMTYuMzExNTYxIDYuMjk0OTIxOSAxNi43MDMxMjUgTCA3LjI5Mjk2ODggMTcuNzAxMTcyIEMgNy42ODQ1MjI3IDE4LjA5MjczNSA4LjMxMzUyNDIgMTguMDkyNzM1IDguNzA1MDc4MSAxNy43MDExNzIgTCA5LjcwMTE3MTkgMTYuNzA1MDc4IEMgMTAuMDkyNzI2IDE2LjMxMzUxNSAxMC4wOTI3MjYgMTUuNjg0NTMyIDkuNzAxMTcxOSAxNS4yOTI5NjkgTCA4LjcwMzEyNSAxNC4yOTI5NjkgQyA4LjUwNzM0OCAxNC4wOTcxODcgOC4yNTE1OTMzIDE0IDcuOTk2MDkzOCAxNCB6ICIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMTAzMi4zNjIyKSIKICAgICAgIGlkPSJyZWN0OTE5OCIgLz4KICA8L2c+Cjwvc3ZnPgo=)}.mapboxgl-map.mouse-pointer .mapboxgl-canvas-container.mapboxgl-interactive{cursor:pointer}.mapboxgl-map.mouse-move .mapboxgl-canvas-container.mapboxgl-interactive{cursor:move}.mapboxgl-map.mouse-add .mapboxgl-canvas-container.mapboxgl-interactive{cursor:crosshair}.mapboxgl-map.mouse-move.mode-direct_select .mapboxgl-canvas-container.mapboxgl-interactive{cursor:grab;cursor:-webkit-grab}.mapboxgl-map.mode-direct_select.feature-vertex.mouse-move .mapboxgl-canvas-container.mapboxgl-interactive{cursor:move}.mapboxgl-map.mode-direct_select.feature-midpoint.mouse-pointer .mapboxgl-canvas-container.mapboxgl-interactive{cursor:cell}.mapboxgl-map.mode-direct_select.feature-feature.mouse-move .mapboxgl-canvas-container.mapboxgl-interactive{cursor:move}.mapboxgl-map.mode-static.mouse-pointer .mapboxgl-canvas-container.mapboxgl-interactive{cursor:grab;cursor:-webkit-grab}.mapbox-gl-draw_boxselect{pointer-events:none;position:absolute;top:0;left:0;width:0;height:0;background:rgba(0,0,0,.1);border:2px dotted #fff;opacity:.5}", ""]);
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "body,html{margin:0;padding:0;height:100%;font-weight:300;overflow:hidden}app-component{display:block;width:100%;height:100%;background-color:#eee;overflow-x:hidden}app-component .branding{position:relative;padding:4px 14px;min-height:160px}app-component .branding:before{content:' ';display:block;position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;opacity:.6;background-image:url(" + __webpack_require__(187) + ");background-position:0 bottom;background-repeat:no-repeat;background-size:100% auto}app-component .branding .site-title{line-height:1.2;margin-bottom:6px;z-index:2}app-component .branding .byline{margin-top:0;font-size:12px;text-transform:uppercase;font-weight:300;position:relative;z-index:2}app-component .branding .byline a{color:#196dac;text-decoration:none;font-weight:700}app-component .branding.is-dark:before{background-image:url(" + __webpack_require__(188) + ")}app-component .site-sidenav{width:272px;min-width:272px;max-width:272px;height:100%;box-shadow:1px 0 3px rgba(0,0,0,.3)}app-component .info-sidenav{overflow:hidden;width:272px;min-width:272px;max-width:272px;box-shadow:-1px 0 3px rgba(0,0,0,.3)}app-component .info-sidenav md-content{background-color:transparent}app-component .info-sidenav .emu-banner{display:block;margin:8px;border:1px solid hsla(0,0%,100%,.6);background-image:url(" + __webpack_require__(186) + ");background-repeat:no-repeat;background-color:#333;background-size:cover;height:200px}app-component .info-sidenav .emu-banner:hover{border:1px solid hsla(0,0%,100%,.8);background-blend-mode:screen}app-component .sidenav-button{position:absolute;transition:left .2s ease!important;left:0}app-component .sidenav-button.sidebar-open{left:272px}app-component .sidenav-button md-icon{line-height:24px}app-component .infonav-button{position:absolute;right:-10px;top:0;z-index:5000}app-component .infonav-button md-icon{font-size:20px;line-height:24px}app-component .main-container{position:relative;height:100%}app-component map-component,app-component mapbox-gl{display:block;height:100%}app-component md-icon.fa{line-height:24px}app-component .switch-container{background-color:rgba(0,0,0,.3);padding:0 14px;color:#fff;font-weight:400}.fade-in.ng-enter{transition:all .5s linear;opacity:0}.fade-in.ng-enter.ng-enter-active{opacity:1}.fade-out.ng-leave{transition:all .5s linear;opacity:1}.fade-out.ng-leave.ng-leave-active{opacity:0}.browsehappy{padding:1em}.md-subheader-flex ._md-subheader-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.md-subheader-flex ._md-subheader-content>p{margin:0;-ms-flex:1 1 auto;flex:1 1 auto}md-icon[md-font-set=fa]{text-align:center}md-icon[md-font-set=fa][ng-click]{cursor:pointer;outline:none}md-icon[md-font-set=fa][ng-click][disabled]{cursor:not-allowed;outline:none}md-icon[md-font-set=fa].large{font-size:20px}md-list-item._md-button-wrap>div._md-no-style.md-button{padding-right:8px}md-list-item._md-button-wrap>div._md-no-style.md-button button.md-secondary{margin:0}.help-text h4{margin-bottom:0}.help-text p{margin:0}.help-text b{color:hsla(0,0%,100%,.95)}.help-text a{text-decoration:none;color:inherit;font-weight:400}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "big-number{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}big-number .title{position:absolute;top:0;left:0;width:100%;padding:.2em;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden;font-weight:500}big-number .number{font-size:32px;font-weight:700}big-number .unit{font-size:16px;font-weight:700;padding-left:.1em}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "geo-search{position:relative;min-height:40px}geo-search .search-icon{display:block;position:absolute;top:8px;left:14px;color:rgba(0,0,0,.5);z-index:5000}geo-search input[name=autocomplete]{padding-left:35px}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, 'histogram{display:block}histogram .axis line,histogram .axis path{fill:none;stroke:#fff;shape-rendering:crispEdges}histogram .axis path{stroke:none}histogram .axis text{fill:#fff;font-weight:700;font-size:10px}.d3-tip{font-weight:700;padding:12px;background:rgba(0,0,0,.8);color:#fff;border-radius:2px;z-index:5000}.d3-tip,.d3-tip:after{line-height:1;pointer-events:none}.d3-tip:after{box-sizing:border-box;display:inline;font-size:10px;width:100%;color:rgba(0,0,0,.8);position:absolute}.d3-tip.n:after{content:"\\25BC";margin:-1px 0 0;top:100%;left:0;text-align:center}.d3-tip.e:after{content:"\\25C0";margin:-4px 0 0;top:50%;left:-8px}.d3-tip.s:after{content:"\\25B2";margin:0 0 1px;top:-8px;left:0;text-align:center}.d3-tip.w:after{content:"\\25B6";margin:-4px 0 0 -1px;top:50%;left:100%}', ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "infographic{display:block;padding:24px 8px 8px}infographic .info-button{position:absolute;top:-7px;right:-14px;z-index:5000}infographic .info-button md-icon{color:hsla(0,0%,100%,.9);font-size:16px;line-height:24px}infographic .info-title{font-size:18px;margin-top:0;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}infographic .dim{color:hsla(0,0%,100%,.6);font-weight:500}infographic big-number,infographic histogram{width:100%;height:100%;background-color:rgba(0,0,0,.4);color:#fff}infographic .loading-container{position:absolute;background-color:rgba(0,0,0,.5);z-index:1000;height:100%;width:100%}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "map-legend ul{list-style:none;margin:0;padding:0}map-legend ul.chip-background{box-shadow:0 0 5px 0 rgba(0,0,0,.75)}map-legend ul.chip-text{position:absolute;top:0}map-legend .legend-title{font-size:14px;font-weight:700;text-shadow:0 0 4px #000;white-space:nowrap;position:absolute;bottom:0;left:38px;color:hsla(0,0%,100%,.95);transform:rotate(-90deg);transform-origin:left bottom 0}map-legend .legend-color-chip{text-align:center;font-size:10px;line-height:20px;color:rgba(0,0,0,.7);min-width:20px;min-height:20px}map-legend .marker{position:absolute;width:100%;height:2px;left:0;top:20px;background-color:#fff;transition:top .2s,opacity .2s;box-shadow:0 1px 2px rgba(0,0,0,.5)}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "map-component{background-color:#000}map-component .mapboxgl-map.hover .mapboxgl-canvas-container{cursor:pointer}map-component .zoom-button{position:absolute;top:50px;left:0;transition:left .4s,top .4s!important}map-component .zoom-button md-icon{line-height:24px}map-component .zoom-button-out{top:98px}map-component map-legend{position:absolute;bottom:36px;left:16px;transition:left .4s,top .4s!important}map-component .building-popup{position:relative;width:200px;height:134px}map-component .building-popup h4{margin-top:0;margin-bottom:.2em}map-component .building-popup a{text-decoration:none;color:#666}map-component .building-popup a.w3w{position:absolute;left:-2px;bottom:0;padding-left:16px;background-image:url(/assets/image/w3w-pin.png);background-repeat:no-repeat;background-position:0;background-size:15px 15px}map-component .loading-container{position:absolute;width:100%;height:100%;opacity:1}map-component mapbox-gl{transition:opacity 1s;opacity:0}@media (min-width:960px){map-component .zoom-button{top:0}map-component .zoom-button-out{top:48px}}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "mapbox-gl{display:block}mapbox-gl.loading{visibility:hidden}mapbox-gl .mapboxgl-popup{color:#000}mapbox-gl .mapboxgl-popup-close-button{z-index:5000;font-size:24px}", ""])
    }
    , function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(23)(),
            exports.push([module.id, "welcome-component h4{margin-bottom:0}welcome-component p{margin:0}welcome-component b{color:hsla(0,0%,100%,.95)}welcome-component a{text-decoration:none;color:inherit;font-weight:400}", ""])
    }
    , , , , , , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__.p + "/assets/image/data-download.png?b123eeddeb7c0444f3b19ee81eafe977"
    }
    , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__.p + "/assets/image/london-skyline-black.png?fd4effca953b8618f99bc72d03816faf"
    }
    , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__.p + "/assets/image/london-skyline-white.png?07cb85856edff760815aa4de7689a552"
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _config = __webpack_require__(213)
            , _config2 = _interopRequireDefault(_config)
            , _appComponent = __webpack_require__(191)
            , _appComponent2 = _interopRequireDefault(_appComponent);
        module.exports = angular.module("app", ["ngAnimate", "ngMessages", "ngSanitize", "ngStorage", "gettext", "ngMaterial", "angulartics", __webpack_require__(130), _config2.default.name, _appComponent2.default.name])
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.AppController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _appComponent = __webpack_require__(253)
            , _appComponent2 = _interopRequireDefault(_appComponent);
        __webpack_require__(555);
        var _debounce = __webpack_require__(121)
            , _debounce2 = _interopRequireDefault(_debounce)
            , _area = __webpack_require__(128)
            , _cloneDeep = (_interopRequireDefault(_area),
            __webpack_require__(539))
            , debug = (_interopRequireDefault(_cloneDeep),
            __webpack_require__(32)("buildingheights:app-component"))
            , MAX_POLYGON_AREA_KM = 1600
            , AppController = exports.AppController = function() {
            function AppController($scope, $timeout, $location, $q, $window, $mdSidenav, $mdTheming, $mdDialog, $analytics, AppState, PolygonService, MapService) {
                "ngInject";
                _classCallCheck(this, AppController),
                    this.$scope = $scope,
                    this.$timeout = $timeout,
                    this.$location = $location,
                    this.$q = $q,
                    this.window = angular.element($window),
                    this.$mdSidenav = $mdSidenav,
                    this.$mdTheming = $mdTheming,
                    this.$mdDialog = $mdDialog,
                    this.$analytics = $analytics,
                    this.AppState = AppState,
                    this.PolygonService = PolygonService,
                    this.MapService = MapService,
                    this.enable3D = !1,
                    this.isInfoNavOpen = !1
            }
            return AppController.$inject = ["$scope", "$timeout", "$location", "$q", "$window", "$mdSidenav", "$mdTheming", "$mdDialog", "$analytics", "AppState", "PolygonService", "MapService"],
                _createClass(AppController, [{
                    key: "$onInit",
                    value: function() {
                        var _this = this
                            , debouncedResizeEvent = (0,
                            _debounce2.default)(function() {
                            _this.$scope.$root.$broadcast("window:resize")
                        }, 200);
                        this.window.bind("resize", function() {
                            debouncedResizeEvent()
                        }),
                            this._loadPolygons();
                        var queryString = this.$location.search();
                        this.mapParams = {
                            lng: queryString.x ? +queryString.x : -.1016822,
                            lat: queryString.y ? +queryString.y : 51.5157718,
                            zoom: queryString.z ? +queryString.z : 12
                        },
                            this.MapService.on("mapmoved", function(mapId, center, zoom) {
                                _this._updateQueryString(center, zoom)
                            }),
                            this.isDarkTheme = this.$mdTheming.THEMES[this.$mdTheming.defaultTheme()].isDark
                    }
                }, {
                    key: "toggleSidebar",
                    value: function() {
                        this.$mdSidenav("left").toggle(),
                            this.$mdSidenav("right").close()
                    }
                }, {
                    key: "toggleInfoBar",
                    value: function() {
                        this.$mdSidenav("right").toggle()
                    }
                }, {
                    key: "mapLoaded",
                    value: function() {
                        this.$mdSidenav("right").open()
                    }
                }, {
                    key: "infoPanelContent",
                    value: function() {
                        return this.AppState.ui.drawing ? this.AppState.ui.drawing : this.selectedPolygon ? "infographic" : "welcome"
                    }
                }, {
                    key: "onSelectPolygon",
                    value: function(polygon) {
                        var _this2 = this;
                        this.selectedPolygon = polygon,
                            this.isInfoNavOpen = !0,
                            this.$mdSidenav("left").close(),
                            this._populateGeometry(polygon).then(function() {
                                _this2.MapService.displayPolygon("main-map", polygon.geometry, polygon.bounds, 20, [-100, 0]),
                                    _this2._populateMetrics(polygon)
                            })
                    }
                }, {
                    key: "onAddPolygon",
                    value: function(group, $event) {
                        var _this3 = this;
                        if (!this.AppState.ui.drawing) {
                            var prompt = this.$mdDialog.prompt().title("Add a new area").textContent("Enter a name for the new area area").theme("light").initialValue("Area #" + (group.polygons.length + 1)).targetEvent($event).ok("OK").cancel("Cancel");
                            this.$mdDialog.show(prompt).then(function(name) {
                                _this3.isInfoNavOpen = !0,
                                    _this3.AppState.ui.drawing = "draw";
                                var temporaryPolygon = {
                                    name: name
                                };
                                group.polygons.push(temporaryPolygon),
                                    _this3.MapService.drawPolygon("main-map", function(feature) {
                                        _this3.AppState.ui.drawing = !1,
                                        feature && !function() {
                                            var newPolygon = {
                                                name: name,
                                                geometry: feature.geometry,
                                                bounds: feature.bounds,
                                                area: feature.area
                                            };
                                            if (newPolygon.area > 1e6 * MAX_POLYGON_AREA_KM) {
                                                debug("area: " + newPolygon.area);
                                                var confirm = _this3.$mdDialog.confirm().title("Area Too Large").htmlContent("This free version of Building Heights only supports areas less than " + MAX_POLYGON_AREA_KM + "<sup>2</sup>").theme("light").ok("OK");
                                                _this3.$mdDialog.show(confirm)
                                            } else
                                                _this3.PolygonService.createPolygon(newPolygon, group).then(function(polygons) {
                                                    _this3.polygons = polygons,
                                                        _this3.onSelectPolygon(newPolygon)
                                                })
                                        }(),
                                            group.polygons.splice(group.polygons.indexOf(temporaryPolygon), 1)
                                    })
                            })
                        }
                    }
                }, {
                    key: "onEditPolygon",
                    value: function(item, group) {
                        var _this4 = this;
                        this.isInfoNavOpen = !0,
                            this.AppState.ui.drawing = "edit",
                        this.selectedPolygon !== item && this.onSelectPolygon(item),
                            this.MapService.clearPolygons("main-map"),
                            this.MapService.editPolygon("main-map", item.geometry, function(feature) {
                                _this4.AppState.ui.drawing = !1,
                                    item.geometry = feature.geometry,
                                    item.bounds = feature.bounds,
                                    item.area = feature.area,
                                    item.metrics = null,
                                    delete item.metrics,
                                    _this4.PolygonService.updatePolygon(item, group).then(function(polygons) {
                                        _this4.polygons = polygons,
                                            _this4.onSelectPolygon(item)
                                    })
                            })
                    }
                }, {
                    key: "onDeletePolygon",
                    value: function(item, group) {
                        var _this5 = this
                            , confirm = this.$mdDialog.confirm().title("Delete " + item.name).textContent("Are you sure you want to delete this area?").theme("light").ok("OK").cancel("Cancel");
                        this.$mdDialog.show(confirm).then(function() {
                            _this5.$analytics.eventTrack("Delete Area"),
                                _this5.PolygonService.deletePolygon(item, group).then(function(polygons) {
                                    _this5.polygons = polygons,
                                        _this5.MapService.clearPolygons("main-map"),
                                        _this5.isInfoNavOpen = !1
                                })
                        })
                    }
                }, {
                    key: "onGeoSearch",
                    value: function(item, boundingBox) {
                        item.id ? this.onSelectPolygon(item) : (this.$analytics.eventTrack("Search For Place", {
                            label: item.name
                        }),
                            this.MapService.fitBounds("main-map", item.bounds, 20, [-100, 0]))
                    }
                }, {
                    key: "toggle3D",
                    value: function() {
                        this.MapService.enable3D("main-map", this.enable3D)
                    }
                }, {
                    key: "_updateQueryString",
                    value: function(center, zoom) {
                        this.$location.search({
                            x: center.lng,
                            y: center.lat,
                            z: zoom
                        })
                    }
                }, {
                    key: "_loadPolygons",
                    value: function() {
                        var _this6 = this;
                        this.PolygonService.loadPolygons().then(function(polygons) {
                            _this6.polygons = polygons
                        })
                    }
                }, {
                    key: "_populateGeometry",
                    value: function(polygon) {
                        return polygon.geometry ? this.$q.when(polygon.geometry) : this.PolygonService.loadPolygonGeometry(polygon.id).then(function(geojson) {
                            polygon.geometry = geojson
                        })
                    }
                }, {
                    key: "_populateMetrics",
                    value: function(polygon) {
                        return polygon.metrics ? this.$q.when(polygon.geometry) : this.PolygonService.loadMetricsForGeometry(polygon.geometry).then(function(metrics) {
                            polygon.metrics = metrics
                        })
                    }
                }]),
                AppController
        }();
        exports.default = {
            controller: AppController,
            template: _appComponent2.default
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _appComponent = __webpack_require__(190)
            , _appComponent2 = _interopRequireDefault(_appComponent)
            , _appState = __webpack_require__(119)
            , _appState2 = _interopRequireDefault(_appState)
            , _mapComponent = __webpack_require__(203)
            , _mapComponent2 = _interopRequireDefault(_mapComponent)
            , _polygonListComponent = __webpack_require__(209)
            , _polygonListComponent2 = _interopRequireDefault(_polygonListComponent)
            , _polygonService = __webpack_require__(120)
            , _polygonService2 = _interopRequireDefault(_polygonService)
            , _infographicComponent = __webpack_require__(199)
            , _infographicComponent2 = _interopRequireDefault(_infographicComponent)
            , _geoSearch = __webpack_require__(195)
            , _geoSearch2 = _interopRequireDefault(_geoSearch)
            , _welcomeComponent = __webpack_require__(211)
            , _welcomeComponent2 = _interopRequireDefault(_welcomeComponent);
        exports.default = angular.module("app-component", [_appState2.default.name, _mapComponent2.default.name, _polygonListComponent2.default.name, _polygonService2.default.name, _infographicComponent2.default.name, _geoSearch2.default.name, _welcomeComponent2.default.name]).component("appComponent", _appComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.BigNumberController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _bigNumber = __webpack_require__(254)
            , _bigNumber2 = _interopRequireDefault(_bigNumber);
        __webpack_require__(556);
        var _d = __webpack_require__(47)
            , _d2 = _interopRequireDefault(_d)
            , BigNumberController = exports.BigNumberController = function() {
            function BigNumberController($scope, $element, $sce) {
                "ngInject";
                _classCallCheck(this, BigNumberController),
                    this.$scope = $scope,
                    this.$element = $element,
                    this.$sce = $sce
            }
            return BigNumberController.$inject = ["$scope", "$element", "$sce"],
                _createClass(BigNumberController, [{
                    key: "$onInit",
                    value: function() {
                        var _this = this;
                        this.$scope.$watch("$ctrl.value", function(newVal, oldVal) {
                            return _this.updateValue(oldVal, newVal)
                        }),
                            this.formatNumber = _d2.default.format(this.numberFormat || ",.3r"),
                            this.numberElem = _d2.default.select(this.$element[0]).select(".number"),
                            this.titleHTML = this.$sce.trustAsHtml(this.title),
                            this.unitHTML = this.$sce.trustAsHtml(this.unit)
                    }
                }, {
                    key: "updateValue",
                    value: function(oldVal, newVal) {
                        var self = this;
                        oldVal = isNaN(oldVal) ? 0 : oldVal,
                            newVal = isNaN(newVal) ? 0 : newVal,
                            this.numberElem.transition().duration(this.transitionDuration || 250).ease("quad-out-in").tween("text", function() {
                                var interp = _d2.default.interpolateNumber(oldVal || 0, newVal);
                                return function(t) {
                                    var num = self.formatNumber(interp(t)).replace(" ", "&nbsp;");
                                    this.innerHTML = num
                                }
                            })
                    }
                }]),
                BigNumberController
        }();
        exports.default = {
            controller: BigNumberController,
            bindings: {
                title: "@",
                value: "<",
                numberFormat: "@",
                unit: "@",
                transitionDuration: "@"
            },
            template: _bigNumber2.default
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _bigNumberComponent = __webpack_require__(192)
            , _bigNumberComponent2 = _interopRequireDefault(_bigNumberComponent);
        exports.default = angular.module("emu.big-number", []).component("bigNumber", _bigNumberComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.GeoSearchController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _geoSearch = __webpack_require__(255)
            , _geoSearch2 = _interopRequireDefault(_geoSearch);
        __webpack_require__(557);
        var GeoSearchController = exports.GeoSearchController = function() {
            function GeoSearchController($q, $http, CONFIG) {
                "ngInject";
                _classCallCheck(this, GeoSearchController),
                    this.$q = $q,
                    this.$http = $http,
                    this.CONFIG = CONFIG
            }
            return GeoSearchController.$inject = ["$q", "$http", "CONFIG"],
                _createClass(GeoSearchController, [{
                    key: "$onInit",
                    value: function() {}
                }, {
                    key: "getMatches",
                    value: function(queryText) {
                        var _this = this;
                        queryText = queryText.toLowerCase();
                        var matchingPolygon = this.polygons && this.polygons.find(function(item) {
                            return item.name.toLowerCase() === queryText
                        });
                        return matchingPolygon ? [matchingPolygon] : this.$q(function(resolve, reject) {
                            _this.$http.get(_this.CONFIG.nominatimEndpoint + "/search", {
                                params: {
                                    q: queryText,
                                    format: "json",
                                    countrycodes: "gb"
                                }
                            }).then(function(response) {
                                console.log(response.data),
                                    resolve(_this.normalizeResults(response.data))
                            })
                        })
                    }
                }, {
                    key: "itemSelected",
                    value: function(item) {
                        var bounds = item.boundingbox && [item.boundingbox[2], item.boundingbox[0], item.boundingbox[3], item.boundingbox[1]];
                        this.onLocationSelected({
                            item: item,
                            boundingBox: bounds
                        })
                    }
                }, {
                    key: "normalizeResults",
                    value: function(data) {
                        return data.map(function(d) {
                            var item = {
                                name: d.display_name,
                                bounds: [d.boundingbox[2], d.boundingbox[0], d.boundingbox[3], d.boundingbox[1]]
                            };
                            return item
                        })
                    }
                }]),
                GeoSearchController
        }();
        Array.prototype.find || (Array.prototype.find = function(predicate) {
                if (null === this)
                    throw new TypeError("Array.prototype.find called on null or undefined");
                if ("function" != typeof predicate)
                    throw new TypeError("predicate must be a function");
                for (var value, list = Object(this), length = list.length, thisArg = arguments[1], i = 0; length > i; i++)
                    if (value = list[i],
                        predicate.call(thisArg, value, i, list))
                        return value
            }
        ),
            exports.default = {
                controller: GeoSearchController,
                bindings: {
                    polygons: "<",
                    onLocationSelected: "&"
                },
                template: _geoSearch2.default
            }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _geoSearchComponent = __webpack_require__(194)
            , _geoSearchComponent2 = _interopRequireDefault(_geoSearchComponent);
        exports.default = angular.module("emu.geo-search", []).component("geoSearch", _geoSearchComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.HistogramController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _d = __webpack_require__(47)
            , _d2 = _interopRequireDefault(_d);
        __webpack_require__(197),
            __webpack_require__(558);
        var HistogramController = exports.HistogramController = function() {
            function HistogramController($scope, $element) {
                "ngInject";
                _classCallCheck(this, HistogramController),
                    this.$scope = $scope,
                    this.$element = $element
            }
            return HistogramController.$inject = ["$scope", "$element"],
                _createClass(HistogramController, [{
                    key: "$onInit",
                    value: function() {
                        var _this = this;
                        this.$scope.$on("resize", this.resize.bind(this)),
                            this.$scope.$watch("$ctrl.data", function(data) {
                                return _this.renderChart(data)
                            }),
                            this.histogram = _d2.default.select(this.$element[0]).select("svg").chart("BarChart").width(230).height(150)
                    }
                }, {
                    key: "renderChart",
                    value: function(data) {
                        data && (this.resize(),
                            this.histogram.draw(data))
                    }
                }, {
                    key: "resize",
                    value: function() {
                        this.histogram.width(this.$element[0].offsetWidth).height(this.$element[0].offsetHeight)
                    }
                }]),
                HistogramController
        }();
        exports.default = {
            controller: HistogramController,
            bindings: {
                data: "<"
            },
            template: "<svg></svg>"
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _d = __webpack_require__(47)
            , _d2 = _interopRequireDefault(_d)
            , _d3Tip = __webpack_require__(158)
            , _d3Tip2 = _interopRequireDefault(_d3Tip);
        _d2.default.chart("BarChart", {
            initialize: function() {
                var chart = this;
                this.margins = {
                    top: 16,
                    right: 10,
                    bottom: 24,
                    left: 10
                },
                    this.xScale = _d2.default.scale.linear(),
                    this.yScale = _d2.default.scale.log(),
                    this._width = this._width || this.base.attr("width") || 200,
                    this._height = this._height || this.base.attr("height") || 100,
                    this._innerWidth = this._width - this.margins.left - this.margins.right,
                    this._innerHeight = this._height - this.margins.top - this.margins.bottom;
                var tipFormatter = _d2.default.format(this.numberFormat || ",d")
                    , tip = (0,
                    _d3Tip2.default)(_d2.default).attr("class", "d3-tip").offset([-10, 0]).html(function(d) {
                    return tipFormatter(d.value) + " buildings"
                });
                this.xAxis = _d2.default.svg.axis().scale(chart.xScale).ticks(11).tickFormat(function(d, i) {
                    return d > 100 ? ">" : d
                }).orient("bottom"),
                    this.yAxis = _d2.default.svg.axis().scale(chart.yScale).orient("left").tickFormat(function(d) {
                        return chart.yScale.tickFormat(6, _d2.default.format(",d"))(d)
                    }).tickValues([10, 1e3, 1e5]),
                    this.yAxisLayer = this.base.append("g").classed("axis axis-y", !0).attr("transform", "translate(" + (this.margins.left + this._innerWidth) + "," + this.margins.top + ")"),
                    this.xAxisLayer = this.base.append("g").classed("axis axis-x", !0).attr("transform", "translate(" + this.margins.left + "," + (this.margins.top + this._innerHeight) + ")"),
                    this.barsLayer = this.base.append("g").classed("bars", !0).attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")"),
                    this.barsLayer.call(tip),
                    this.layer("bars", chart.barsLayer, {
                        dataBind: function(data) {
                            return chart.xScale.domain([0, 110]),
                                chart.yScale.domain([1, 1e6]),
                                chart.yAxisLayer.call(chart.yAxis),
                                chart.xAxisLayer.call(chart.xAxis),
                                this.selectAll(".bar").data(data)
                        },
                        insert: function() {
                            return this.append("rect").classed("bar", !0).attr("fill", "white").attr("width", "14px").on("mouseover", tip.show).on("mouseout", tip.hide)
                        }
                    });
                var onEnter = function() {
                    return this.attr("x", function(d) {
                        return chart.xScale(10 * (d.bucket - 1)) + 4
                    }).attr("y", function(d) {
                        return chart.yScale(_d2.default.max([1, d.value]))
                    }).attr("height", function(d) {
                        return Math.abs(chart.yScale(_d2.default.max([1, d.value])) - chart.yScale(1))
                    })
                };
                this.layer("bars").on("enter:transition", onEnter),
                    this.layer("bars").on("update:transition", onEnter),
                    this.layer("bars").on("exit:transition", function() {
                        this.remove()
                    })
            },
            width: function(newWidth) {
                return 0 === arguments.length ? this._width : (this._width = newWidth,
                    this._innerWidth = newWidth - this.margins.left - this.margins.right,
                    this.base.attr("width", this._width),
                    this.xScale.rangeRound([0, this._innerWidth]),
                    this.yAxisLayer.attr("transform", "translate(" + (this.margins.left + this._innerWidth) + "," + this.margins.top + ")"),
                    this.trigger("change:width"),
                this.data && this.draw(this.data),
                    this)
            },
            height: function(newHeight) {
                return 0 === arguments.length ? this._height : (this._height = newHeight,
                    this._innerHeight = newHeight - this.margins.top - this.margins.bottom,
                    this.base.attr("height", this._height),
                    this.yScale.range([this._innerHeight, 0]),
                    this.xAxisLayer.attr("transform", "translate(" + this.margins.left + "," + (this.margins.top + this._innerHeight) + ")"),
                    this.trigger("change:height"),
                this.data && this.draw(this.data),
                    this)
            }
        })
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _histogramComponent = __webpack_require__(196)
            , _histogramComponent2 = _interopRequireDefault(_histogramComponent);
        exports.default = angular.module("emu.histogram", []).component("histogram", _histogramComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _infographicComponent = __webpack_require__(200)
            , _infographicComponent2 = _interopRequireDefault(_infographicComponent)
            , _bigNumberDisplay = __webpack_require__(193)
            , _bigNumberDisplay2 = _interopRequireDefault(_bigNumberDisplay)
            , _polygonService = __webpack_require__(120)
            , _polygonService2 = _interopRequireDefault(_polygonService)
            , _histogramComponent = __webpack_require__(198)
            , _histogramComponent2 = _interopRequireDefault(_histogramComponent);
        exports.default = angular.module("emu.infographic-component", [_bigNumberDisplay2.default.name, _polygonService2.default.name, _histogramComponent2.default.name]).component("infographic", _infographicComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.InfographicController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _infographic = __webpack_require__(258)
            , _infographic2 = _interopRequireDefault(_infographic)
            , _densityInfo = __webpack_require__(256)
            , _densityInfo2 = _interopRequireDefault(_densityInfo)
            , _histogramInfo = __webpack_require__(257)
            , _histogramInfo2 = _interopRequireDefault(_histogramInfo);
        __webpack_require__(559);
        var M2_TO_KM2 = 1e6
            , InfographicController = exports.InfographicController = function() {
            function InfographicController($scope, $element, $timeout, $mdDialog, AppState) {
                "ngInject";
                _classCallCheck(this, InfographicController),
                    this.$scope = $scope,
                    this.$element = $element,
                    this.$timeout = $timeout,
                    this.$mdDialog = $mdDialog,
                    this.AppState = AppState
            }
            return InfographicController.$inject = ["$scope", "$element", "$timeout", "$mdDialog", "AppState"],
                _createClass(InfographicController, [{
                    key: "$onInit",
                    value: function() {
                        var _this = this;
                        this.$scope.$watchGroup(["$ctrl.polygon", "$ctrl.polygon.metrics"], function(newVals) {
                            return _this.updateInfographic(newVals[0])
                        })
                    }
                }, {
                    key: "updateInfographic",
                    value: function(polygon) {
                        polygon && polygon.metrics && (this.updateMetrics(polygon, polygon.metrics),
                            this.updateHistogram(polygon.metrics.histogram))
                    }
                }, {
                    key: "updateMetrics",
                    value: function(polygon, polygonMetrics) {
                        this.metrics = {
                            buildingCount: polygonMetrics.buildingCount,
                            maxHeight: polygonMetrics.maxHeight,
                            polygonArea: polygon.area / M2_TO_KM2,
                            buildingArea: polygonMetrics.totalArea / M2_TO_KM2,
                            areaRatio: polygonMetrics.totalArea / polygon.area,
                            volumeRatio: polygonMetrics.totalVolume / polygon.area
                        }
                    }
                }, {
                    key: "updateHistogram",
                    value: function(data) {
                        for (var _this2 = this, histogramData = [], bucketKey = 1; 11 >= bucketKey; bucketKey++) {
                            var bucket = {
                                bucket: bucketKey,
                                value: data[bucketKey] || 0
                            };
                            histogramData.push(bucket)
                        }
                        this.$timeout(function() {
                            return _this2.histogramData = histogramData
                        }, 100)
                    }
                }, {
                    key: "onLayout",
                    value: function(event) {
                        var _this3 = this;
                        this.$timeout(function() {
                            return _this3.$scope.$broadcast("resize")
                        }, 0)
                    }
                }, {
                    key: "showDensityInfo",
                    value: function(event) {
                        this.$mdDialog.show(this.$mdDialog.alert().clickOutsideToClose(!0).htmlContent(_densityInfo2.default).ariaLabel("Density Index").theme("light").ok("OK").targetEvent(event))
                    }
                }, {
                    key: "showHistogramInfo",
                    value: function(event) {
                        this.$mdDialog.show(this.$mdDialog.alert().clickOutsideToClose(!0).htmlContent(_histogramInfo2.default).ariaLabel("Building Height Histogram").theme("light").ok("OK").targetEvent(event))
                    }
                }]),
                InfographicController
        }();
        exports.default = {
            controller: InfographicController,
            bindings: {
                polygon: "<",
                loading: "<"
            },
            template: _infographic2.default
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _legendComponent = __webpack_require__(202)
            , _legendComponent2 = _interopRequireDefault(_legendComponent);
        exports.default = angular.module("legend-component", []).component("mapLegend", _legendComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.LegendController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _legend = __webpack_require__(259)
            , _legend2 = _interopRequireDefault(_legend);
        __webpack_require__(560);
        var _d = __webpack_require__(47)
            , _d2 = _interopRequireDefault(_d)
            , LegendController = exports.LegendController = function() {
            function LegendController($scope, $timeout) {
                "ngInject";
                _classCallCheck(this, LegendController),
                    this.$timeout = $timeout,
                    this.legendStops = [{
                        value: 0,
                        color: "#5e4fa2"
                    }, {
                        value: 5,
                        color: "#3288bd"
                    }, {
                        value: 10,
                        color: "#66c2a5"
                    }, {
                        value: 20,
                        color: "#abdda4"
                    }, {
                        value: 40,
                        color: "#e6f598"
                    }, {
                        value: 50,
                        color: "#fee08b"
                    }, {
                        value: 75,
                        color: "#fdc675"
                    }, {
                        value: 100,
                        color: "#fdae61"
                    }, {
                        value: 120,
                        color: "#f46d43"
                    }, {
                        value: 150,
                        color: "#d53e4f"
                    }, {
                        value: 200,
                        color: "#9e0142"
                    }];
                var domain = this.legendStops.map(function(stop) {
                    return stop.value
                });
                domain.push(300);
                var inc = 100 / this.legendStops.length
                    , range = this.legendStops.map(function(stop, i) {
                    return 100 - i * inc
                });
                range.push(0),
                    this.markerScale = _d2.default.scale.linear().domain(domain).range(range),
                    this.markerPos = "100%",
                    this.markerOpacity = "0";
                this.markerScale(285);
                $scope.$watch("$ctrl.value", this.onValueChanged.bind(this))
            }
            return LegendController.$inject = ["$scope", "$timeout"],
                _createClass(LegendController, [{
                    key: "$onInit",
                    value: function() {}
                }, {
                    key: "onValueChanged",
                    value: function(newVal) {
                        var _this = this;
                        if (newVal > 0) {
                            var markerPos = this.markerScale(+newVal) + "%";
                            this.markerPos = markerPos,
                                this.markerOpacity = 1,
                            this.hideMarkerTimer && this.$timeout.cancel(this.hideMarkerTimer)
                        } else
                            this.hideMarkerTimer = this.$timeout(function() {
                                _this.markerOpacity = 0
                            }, 500)
                    }
                }]),
                LegendController
        }();
        exports.default = {
            bindings: {
                title: "@",
                value: "@"
            },
            controller: LegendController,
            template: _legend2.default
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _mapComponent = __webpack_require__(204)
            , _mapComponent2 = _interopRequireDefault(_mapComponent)
            , _mapboxgl = __webpack_require__(205)
            , _mapboxgl2 = _interopRequireDefault(_mapboxgl)
            , _legendComponent = __webpack_require__(201)
            , _legendComponent2 = _interopRequireDefault(_legendComponent)
            , _mapService = __webpack_require__(215)
            , _mapService2 = _interopRequireDefault(_mapService)
            , _w3wService = __webpack_require__(218)
            , _w3wService2 = _interopRequireDefault(_w3wService);
        exports.default = angular.module("emu.map-component", [_mapboxgl2.default.name, _legendComponent2.default.name, _mapService2.default.name, _w3wService2.default.name]).component("mapComponent", _mapComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.MapController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _map = __webpack_require__(260)
            , _map2 = _interopRequireDefault(_map)
            , _popupTemplate = __webpack_require__(261)
            , _popupTemplate2 = _interopRequireDefault(_popupTemplate);
        __webpack_require__(561);
        var _debounce = __webpack_require__(121)
            , _debounce2 = _interopRequireDefault(_debounce)
            , _area = __webpack_require__(128)
            , _area2 = _interopRequireDefault(_area)
            , MapController = (__webpack_require__(32)("buildingheights:map-component"),
            exports.MapController = function() {
                function MapController($scope, $element, $compile, MapService, W3WService, CONFIG) {
                    "ngInject";
                    var _this = this;
                    _classCallCheck(this, MapController),
                        this.$scope = $scope,
                        this.$element = $element,
                        this.$compile = $compile,
                        this.MapService = MapService,
                        this.W3WService = W3WService,
                        this.CONFIG = CONFIG,
                        this.updateHover = (0,
                            _debounce2.default)(function(featureId) {
                            _this.map.setFilter("building-hover-line", ["==", "id", featureId]),
                                _this.map.setFilter("building-hover-fill", ["==", "id", featureId])
                        }, 50),
                        this.buildingHeight = 0,
                        $scope.$on("window:resize", function() {
                            _this.map && _this.map.resize()
                        })
                }
                return MapController.$inject = ["$scope", "$element", "$compile", "MapService", "W3WService", "CONFIG"],
                    _createClass(MapController, [{
                        key: "$onInit",
                        value: function() {
                            this.loading = !0,
                                this.mapOpacity = 0,
                                this.mapId = this.$element[0].id
                        }
                    }, {
                        key: "zoom",
                        value: function(increment) {
                            this.map.zoomTo(this.map.getZoom() + increment)
                        }
                    }, {
                        key: "onMapLoad",
                        value: function(map, plugins) {
                            this.map = map,
                                this.mapPlugins = plugins,
                                this.mapOpacity = 1,
                                this.MapService.registerMap(this.mapId, this),
                                this.loading = !1,
                                this.map.jumpTo({
                                    center: [this.params.lng, this.params.lat],
                                    zoom: this.params.zoom
                                }),
                                this.onLoad()
                        }
                    }, {
                        key: "onMapClick",
                        value: function(event) {
                            var drawMode = this.mapPlugins["mapboxgl-draw"].mode;
                            if ("static" === drawMode || "simple_select" === drawMode) {
                                var features = this.map.queryRenderedFeatures(event.point, {
                                    layers: ["buildings", "buildings-extruded"]
                                });
                                features.length && this.showFeaturePopup(features[0])
                            }
                        }
                    }, {
                        key: "onMapMouseMove",
                        value: function(event) {
                            var drawMode = this.mapPlugins["mapboxgl-draw"].mode;
                            if ("static" === drawMode || "simple_select" === drawMode) {
                                var features = this.map.queryRenderedFeatures(event.point, {
                                    layers: ["buildings", "buildings-extruded"]
                                })
                                    , newHoveredFeature = features.length ? features[0] : null;
                                newHoveredFeature !== this.hoveredFeature && (this.hoveredFeature = newHoveredFeature,
                                    this.updateHover(this.hoveredFeature ? this.hoveredFeature.properties.id : 0),
                                    this.buildingHeight = this.hoveredFeature ? this.hoveredFeature.properties.max : 0)
                            }
                        }
                    }, {
                        key: "onMapMoveEnd",
                        value: function(center, zoom) {
                            this.MapService.onMapMoved(this.mapId, center, zoom)
                        }
                    }, {
                        key: "displayPolygon",
                        value: function(polygon, bounds, padding, offset) {
                            this.map.getSource("polygons").setData(polygon),
                            bounds && this.fitBounds(bounds, padding, offset)
                        }
                    }, {
                        key: "clearPolygons",
                        value: function() {
                            this.map.getSource("polygons").setData({
                                type: "FeatureCollection",
                                features: []
                            })
                        }
                    }, {
                        key: "fitBounds",
                        value: function(bounds, padding, offset) {
                            this.map.fitBounds(bounds, {
                                linear: !1,
                                padding: padding,
                                offset: offset,
                                maxZoom: 16
                            })
                        }
                    }, {
                        key: "drawPolygon",
                        value: function(callback) {
                            var drawPlugin = this.mapPlugins["mapboxgl-draw"];
                            drawPlugin.drawPolygon(function(feature) {
                                feature && (feature.area = (0,
                                    _area2.default)(feature)),
                                    callback(feature),
                                    drawPlugin.clear()
                            })
                        }
                    }, {
                        key: "editPolygon",
                        value: function(polygon, callback) {
                            var drawPlugin = this.mapPlugins["mapboxgl-draw"];
                            drawPlugin.editPolygon(polygon, function(feature) {
                                feature.area = (0,
                                    _area2.default)(feature),
                                    callback(feature),
                                    drawPlugin.clear()
                            })
                        }
                    }, {
                        key: "enable3D",
                        value: function(enabled) {
                            this.map.setLayoutProperty("buildings", "visibility", enabled ? "none" : "visible"),
                                this.map.setLayoutProperty("buildings-extruded", "visibility", enabled ? "visible" : "none"),
                                this.map.easeTo({
                                    pitch: enabled ? 60 : 0
                                })
                        }
                    }, {
                        key: "showFeaturePopup",
                        value: function(feature) {
                            var props = feature.properties
                                , scope = this.$scope.$new(!0);
                            scope.props = feature.properties;
                            var content = this.$compile(_popupTemplate2.default)(scope)
                                , popup = new mapboxgl.Popup
                                , oldClickHandler = popup._onClickClose;
                            popup._onClickClose = function() {
                                oldClickHandler(),
                                    scope.$destroy()
                            }
                                ,
                                popup.setLngLat({
                                    lng: props.x,
                                    lat: props.y
                                }).setDOMContent(content[0]).addTo(this.map),
                                this.W3WService.reverseEncode(props.x, props.y).then(function(results) {
                                    scope.w3w = {
                                        words: results.words,
                                        url: results.map
                                    },
                                        console.log(results)
                                })
                        }
                    }]),
                    MapController
            }());
        exports.default = {
            controller: MapController,
            bindings: {
                onLoad: "&",
                params: "<"
            },
            template: _map2.default
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _mapboxglComponent = __webpack_require__(208)
            , _mapboxglComponent2 = _interopRequireDefault(_mapboxglComponent)
            , _mapboxglDrawComponent = __webpack_require__(206)
            , _mapboxglDrawComponent2 = _interopRequireDefault(_mapboxglDrawComponent);
        exports.default = angular.module("emu.mapbox", []).component("mapboxGl", _mapboxglComponent2.default).component("mapboxGlDraw", _mapboxglDrawComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.MapboxGLDrawController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _safeApply = __webpack_require__(122)
            , _safeApply2 = _interopRequireDefault(_safeApply)
            , _mapboxGlDraw = __webpack_require__(220)
            , _mapboxGlDraw2 = _interopRequireDefault(_mapboxGlDraw);
        __webpack_require__(554);
        var _bbox = __webpack_require__(266)
            , _bbox2 = _interopRequireDefault(_bbox)
            , _mapboxglDraw = __webpack_require__(207)
            , _mapboxglDraw2 = _interopRequireDefault(_mapboxglDraw)
            , debug = __webpack_require__(32)("buildingheights:mapbox")
            , MapboxGLDrawController = exports.MapboxGLDrawController = function() {
            function MapboxGLDrawController($scope) {
                "ngInject";
                _classCallCheck(this, MapboxGLDrawController),
                    this.$scope = $scope
            }
            return MapboxGLDrawController.$inject = ["$scope"],
                _createClass(MapboxGLDrawController, [{
                    key: "$onInit",
                    value: function() {
                        debug("draw init"),
                            this.mapComponent.registerPlugin("mapboxgl-draw", this)
                    }
                }, {
                    key: "onPluginRegistered",
                    value: function(map) {
                        var draw = this.draw = new _mapboxGlDraw2.default({
                            displayControlsDefault: !1,
                            styles: _mapboxglDraw2.default.bold
                        });
                        map.addControl(draw),
                            map.on("draw.create", this.onCreateHandler.bind(this)),
                            map.on("draw.update", this.onUpdateHandler.bind(this)),
                            map.on("draw.modechange", this.onModeChangeHandler.bind(this)),
                            this.mode = draw.getMode()
                    }
                }, {
                    key: "onCreateHandler",
                    value: function(event) {
                        var _this = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            _this.createdFeature = event.features[0],
                                debug(event)
                        })
                    }
                }, {
                    key: "onModeChangeHandler",
                    value: function(event) {
                        var _this2 = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            if (debug(event),
                                _this2.mode = event.mode,
                            "simple_select" === _this2.mode && _this2.createCallback)
                                _this2.createdFeature && (_this2.createdFeature.bounds = (0,
                                    _bbox2.default)(_this2.createdFeature)),
                                    _this2.createCallback(_this2.createdFeature),
                                    _this2.createCallback = null,
                                    _this2.createdFeature = null;
                            else if ("simple_select" === _this2.mode && _this2.editCallback) {
                                var editedFeature = _this2.draw.get(_this2.editFeatureId);
                                editedFeature.bounds = (0,
                                    _bbox2.default)(editedFeature),
                                    _this2.editCallback(editedFeature),
                                    _this2.editCallback = null,
                                    _this2.editFeatureId = null
                            }
                        })
                    }
                }, {
                    key: "onUpdateHandler",
                    value: function(event) {
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            debug(event)
                        })
                    }
                }, {
                    key: "drawPolygon",
                    value: function(callback) {
                        this.createdFeature = null,
                            this.createCallback = callback,
                            this.setMode("draw_polygon")
                    }
                }, {
                    key: "editPolygon",
                    value: function(polygon, callback) {
                        this.editCallback = callback,
                            this.editFeatureId = this.draw.add(polygon)[0],
                            this.setMode("direct_select", {
                                featureId: this.editFeatureId
                            })
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this.draw.deleteAll()
                    }
                }, {
                    key: "setMode",
                    value: function(mode, options) {
                        this.mode = mode,
                            this.draw.changeMode(mode, options)
                    }
                }]),
                MapboxGLDrawController
        }();
        exports.default = {
            require: {
                mapComponent: "^mapboxGl"
            },
            controller: MapboxGLDrawController
        }
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var defaultTheme = [{
            id: "gl-draw-polygon-fill-inactive",
            type: "fill",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            paint: {
                "fill-color": "#3bb2d0",
                "fill-outline-color": "#3bb2d0",
                "fill-opacity": .1
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-fill-active",
            type: "fill",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#fbb03b",
                "fill-outline-color": "#fbb03b",
                "fill-opacity": .1
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-midpoint",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-active",
            type: "line",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-line-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-line-active",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-and-line-vertex-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-point-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-opacity": 1,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#3bb2d0"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-stroke-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
            paint: {
                "circle-radius": 10,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-fill-static",
            type: "fill",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#404040",
                "fill-outline-color": "#404040",
                "fill-opacity": .1
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-static",
            type: "line",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#404040",
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-line-static",
            type: "line",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#404040",
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-point-static",
            type: "circle",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#404040"
            },
            interactive: !0
        }]
            , boldTheme = [{
            id: "gl-draw-polygon-fill-inactive",
            type: "fill",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            paint: {
                "fill-color": "#3bb2d0",
                "fill-outline-color": "#3bb2d0",
                "fill-opacity": .7
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-fill-active",
            type: "fill",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#fbb03b",
                "fill-outline-color": "#fbb03b",
                "fill-opacity": .7
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-midpoint",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
            paint: {
                "circle-radius": 4,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 3
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-active",
            type: "line",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 3
            },
            interactive: !0
        }, {
            id: "gl-draw-line-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-line-active",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 2
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-and-line-vertex-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-and-line-vertex-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-point-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-opacity": 1,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#3bb2d0"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-stroke-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
            paint: {
                "circle-radius": 10,
                "circle-color": "#fff"
            },
            interactive: !0
        }, {
            id: "gl-draw-point-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fbb03b"
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-fill-static",
            type: "fill",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#404040",
                "fill-outline-color": "#404040",
                "fill-opacity": .5
            },
            interactive: !0
        }, {
            id: "gl-draw-polygon-stroke-static",
            type: "line",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#404040",
                "line-width": 3
            },
            interactive: !0
        }];
        exports.default = {
            "default": defaultTheme,
            bold: boldTheme
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.MapboxGLController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }();
        __webpack_require__(562);
        var _safeApply = __webpack_require__(122)
            , _safeApply2 = _interopRequireDefault(_safeApply)
            , debug = __webpack_require__(32)("buildingheights:mapbox")
            , MapboxGLController = exports.MapboxGLController = function() {
            function MapboxGLController($element, $scope, $attrs, $timeout) {
                "ngInject";
                _classCallCheck(this, MapboxGLController),
                    this.$element = $element,
                    this.$scope = $scope,
                    this.$attrs = $attrs,
                    this.$timeout = $timeout,
                    this.plugins = {}
            }
            return MapboxGLController.$inject = ["$element", "$scope", "$attrs", "$timeout"],
                _createClass(MapboxGLController, [{
                    key: "$onInit",
                    value: function() {
                        debug("map init"),
                            this.$element.addClass("loading"),
                            this.$timeout(this.delayedInit.bind(this), 100)
                    }
                }, {
                    key: "delayedInit",
                    value: function() {
                        var _this = this
                            , options = this._applyDefaults(this.$scope.$eval(this.$attrs.options), {
                            showZoomControl: !0,
                            zoom: 5,
                            center: [-.1428974, 53.9259611],
                            attributionControl: {
                                position: "bottom-left"
                            }
                        });
                        options.container = this.$element[0],
                            options.style = this.styleSrc,
                            options.attributionControl = !1,
                            mapboxgl.accessToken = this.accessToken,
                            this.map = new mapboxgl.Map(options),
                        options.showZoomControl && this.map.addControl(new mapboxgl.NavigationControl({
                            position: "top-right"
                        })),
                            this.map.addControl(new mapboxgl.AttributionControl({
                                position: "bottom-left"
                            })),
                            this.map.on("load", this.onLoadHandler.bind(this)),
                            this.invokePlugins(function(plugin) {
                                return plugin.onPluginRegistered(_this.map)
                            })
                    }
                }, {
                    key: "registerPlugin",
                    value: function(id, plugin) {
                        this.plugins[id] = plugin
                    }
                }, {
                    key: "invokePlugins",
                    value: function(f) {
                        var _this2 = this;
                        Object.keys(this.plugins).forEach(function(key) {
                            return f(_this2.plugins[key])
                        })
                    }
                }, {
                    key: "onLoadHandler",
                    value: function() {
                        var _this3 = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            _this3.map.resize(),
                                _this3.map.on("click", _this3.onClickHandler.bind(_this3)),
                                _this3.map.on("mousemove", _this3.onMouseMoveHandler.bind(_this3)),
                                _this3.map.on("moveend", _this3.onMoveEndHandler.bind(_this3)),
                                _this3.onInit({
                                    map: _this3.map,
                                    plugins: _this3.plugins
                                }),
                                _this3.$element.removeClass("loading"),
                                _this3.onMoveEndHandler()
                        })
                    }
                }, {
                    key: "onClickHandler",
                    value: function(e) {
                        var _this4 = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            _this4.onClick({
                                map: _this4.map,
                                event: e
                            })
                        })
                    }
                }, {
                    key: "onMouseMoveHandler",
                    value: function(e) {
                        var _this5 = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            _this5.onMouseMove({
                                map: _this5.map,
                                event: e
                            })
                        })
                    }
                }, {
                    key: "onMoveEndHandler",
                    value: function() {
                        var _this6 = this;
                        (0,
                            _safeApply2.default)(this.$scope, function() {
                            var center = _this6.map.getCenter()
                                , zoom = _this6.map.getZoom();
                            _this6.onMoveEnd({
                                center: center,
                                zoom: zoom
                            })
                        })
                    }
                }, {
                    key: "_applyDefaults",
                    value: function() {
                        for (var combinedOptions = {}, _len = arguments.length, options = Array(_len), _key = 0; _len > _key; _key++)
                            options[_key] = arguments[_key];
                        var _iteratorNormalCompletion = !0
                            , _didIteratorError = !1
                            , _iteratorError = void 0;
                        try {
                            for (var _step, _iterator = options[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                                var o = _step.value;
                                for (var p in o)
                                    void 0 === combinedOptions[p] && (combinedOptions[p] = o[p])
                            }
                        } catch (err) {
                            _didIteratorError = !0,
                                _iteratorError = err
                        } finally {
                            try {
                                !_iteratorNormalCompletion && _iterator.return && _iterator.return()
                            } finally {
                                if (_didIteratorError)
                                    throw _iteratorError
                            }
                        }
                        return combinedOptions
                    }
                }]),
                MapboxGLController
        }();
        exports.default = {
            bindings: {
                onInit: "&",
                onClick: "&",
                onMouseMove: "&",
                onMoveEnd: "&",
                styleSrc: "@",
                accessToken: "@"
            },
            controller: MapboxGLController
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _polygonListComponent = __webpack_require__(210)
            , _polygonListComponent2 = _interopRequireDefault(_polygonListComponent);
        exports.default = angular.module("emu.polygon-list", []).component("polygonList", _polygonListComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.PolygonListController = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _polygonList = __webpack_require__(262)
            , _polygonList2 = _interopRequireDefault(_polygonList)
            , PolygonListController = exports.PolygonListController = function() {
            function PolygonListController(AppState) {
                "ngInject";
                _classCallCheck(this, PolygonListController),
                    this.AppState = AppState
            }
            return PolygonListController.$inject = ["AppState"],
                _createClass(PolygonListController, [{
                    key: "$onInit",
                    value: function() {}
                }, {
                    key: "itemClicked",
                    value: function(item) {
                        this.onItemClick({
                            item: item
                        })
                    }
                }, {
                    key: "addItem",
                    value: function(group, $event) {
                        this.onItemAdd({
                            group: group,
                            $event: $event
                        })
                    }
                }, {
                    key: "editItem",
                    value: function(item, group) {
                        this.onItemEdit({
                            item: item,
                            group: group
                        })
                    }
                }, {
                    key: "deleteItem",
                    value: function(item, group) {
                        console.log(item),
                            this.onItemDelete({
                                polygon: item,
                                polygonGroup: group
                            })
                    }
                }]),
                PolygonListController
        }();
        exports.default = {
            controller: PolygonListController,
            template: _polygonList2.default,
            bindings: {
                polygons: "<",
                onItemClick: "&",
                onItemAdd: "&",
                onItemEdit: "&",
                onItemDelete: "&"
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _welcomeComponent = __webpack_require__(212)
            , _welcomeComponent2 = _interopRequireDefault(_welcomeComponent);
        exports.default = angular.module("emu.welcome", []).component("welcomeComponent", _welcomeComponent2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
            exports.WelcomeController = void 0;
        var _welcome = __webpack_require__(263)
            , _welcome2 = _interopRequireDefault(_welcome);
        __webpack_require__(563);
        var WelcomeController = exports.WelcomeController = function WelcomeController() {
                "ngInject";
                _classCallCheck(this, WelcomeController)
            }
        ;
        exports.default = {
            controller: WelcomeController,
            template: _welcome2.default
        }
    }
    , function(module, exports) {
        "use strict";
        function config($locationProvider, $httpProvider, $localStorageProvider, $analyticsProvider, $mdThemingProvider, APP_ID) {
            "ngInject";
            $localStorageProvider.setKeyPrefix(APP_ID + "."),
                $locationProvider.html5Mode(!0),
                $httpProvider.defaults.headers.post["Content-Type"] = "application/json",
                $analyticsProvider.virtualPageviews(!1),
                $mdThemingProvider.theme("light"),
                $mdThemingProvider.theme("dark").dark(),
                $mdThemingProvider.setDefaultTheme("dark")
        }
        config.$inject = ["$locationProvider", "$httpProvider", "$localStorageProvider", "$analyticsProvider", "$mdThemingProvider", "APP_ID"],
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        var APP_ID = "buildingheights";
        exports.default = angular.module("config", []).constant("APP_ID", APP_ID).config(config)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var AppState = (__webpack_require__(32)("buildingheights:polygon-service"),
                function AppState() {
                    "ngInject";
                    _classCallCheck(this, AppState),
                        this.ui = {
                            metricsLoading: !1,
                            drawing: !1
                        }
                }
        );
        exports.default = AppState
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _mapService = __webpack_require__(216)
            , _mapService2 = _interopRequireDefault(_mapService);
        exports.default = angular.module("emu.map-service", []).service("MapService", _mapService2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        function _possibleConstructorReturn(self, call) {
            if (!self)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass)
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , _wolfy87Eventemitter = __webpack_require__(553)
            , _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter)
            , MapService = (__webpack_require__(32)("buildingheights:map-service"),
            function(_EventEmitter) {
                function MapService() {
                    "ngInject";
                    _classCallCheck(this, MapService);
                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapService).call(this));
                    return _this.maps = {},
                        _this.defineEvents(["mapmoved"]),
                        _this
                }
                return _inherits(MapService, _EventEmitter),
                    _createClass(MapService, [{
                        key: "registerMap",
                        value: function(mapId, map) {
                            this.maps[mapId] = map
                        }
                    }, {
                        key: "getMap",
                        value: function(mapId) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            return this.maps[mapId]
                        }
                    }, {
                        key: "displayPolygon",
                        value: function(mapId, polygon, bounds, padding, offset) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].displayPolygon(polygon, bounds, padding, offset)
                        }
                    }, {
                        key: "clearPolygons",
                        value: function(mapId) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].clearPolygons()
                        }
                    }, {
                        key: "fitBounds",
                        value: function(mapId, bounds, padding, offset) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].fitBounds(bounds, padding, offset)
                        }
                    }, {
                        key: "drawPolygon",
                        value: function(mapId, callback) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].drawPolygon(callback)
                        }
                    }, {
                        key: "editPolygon",
                        value: function(mapId, polygon, callback) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].editPolygon(polygon, callback)
                        }
                    }, {
                        key: "enable3D",
                        value: function(mapId, enabled) {
                            if (!this.maps[mapId])
                                throw new Error("Map " + mapId + " not registered with map service");
                            this.maps[mapId].enable3D(enabled)
                        }
                    }, {
                        key: "onMapMoved",
                        value: function(mapId, center, zoom) {
                            this.emit("mapmoved", mapId, center, zoom)
                        }
                    }]),
                    MapService
            }(_wolfy87Eventemitter2.default));
        exports.default = MapService
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , debug = __webpack_require__(32)("buildingheights:polygon-service")
            , PolygonService = function() {
            function PolygonService($q, $http, $interval, $rootScope, $localStorage, CONFIG, AppState) {
                "ngInject";
                _classCallCheck(this, PolygonService),
                    this.$q = $q,
                    this.$http = $http,
                    this.$interval = $interval,
                    this.$rootScope = $rootScope,
                    this.$localStorage = $localStorage,
                    this.CONFIG = CONFIG,
                    this.AppState = AppState
            }
            return PolygonService.$inject = ["$q", "$http", "$interval", "$rootScope", "$localStorage", "CONFIG", "AppState"],
                _createClass(PolygonService, [{
                    key: "loadPolygons",
                    value: function() {
                        var _this = this
                            , force = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                        return this.$q(function(resolve, reject) {
                            !force && _this._polygons ? resolve(_this._polygons) : _this.$http({
                                method: "GET",
                                url: _this.CONFIG.apiEndpoint + "/cities"
                            }).then(function(response) {
                                var cities = response.data;
                                _this._polygons = [{
                                    title: "My Areas",
                                    allowDrawing: !0,
                                    polygons: _this._loadUserPolygons()
                                }, {
                                    title: "Top 25 Urban Areas",
                                    polygons: cities.sort(function(a, b) {
                                        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                                    })
                                }],
                                    resolve(_this._polygons)
                            }).catch(function(response) {
                                debug(response),
                                    reject(response)
                            })
                        })
                    }
                }, {
                    key: "loadPolygonGeometry",
                    value: function(id) {
                        var _this2 = this;
                        return debug("Loading polygon geometry for id " + id),
                            this.$q(function(resolve, reject) {
                                _this2.$http({
                                    method: "GET",
                                    url: _this2.CONFIG.apiEndpoint + "/cities/" + id + "/geometry"
                                }).then(function(response) {
                                    resolve(response.data)
                                }).catch(function(response) {
                                    debug("Failed to load polygon geometry", response),
                                        reject(response)
                                })
                            })
                    }
                }, {
                    key: "loadMetricsForGeometry",
                    value: function(geometry) {
                        var _this3 = this;
                        return this.AppState.ui.metricsLoading = !0,
                            this.$q(function(resolve, reject) {
                                _this3.$http({
                                    method: "POST",
                                    url: _this3.CONFIG.apiEndpoint + "/cities/metrics",
                                    data: geometry
                                }).then(function(response) {
                                    resolve(response.data)
                                }).catch(function(response) {
                                    debug("Failed to load metrics", response),
                                        reject(response)
                                }).finally(function() {
                                    return _this3.AppState.ui.metricsLoading = !1
                                })
                            })
                    }
                }, {
                    key: "createPolygon",
                    value: function(polygon, group) {
                        var _this4 = this;
                        return this.$q(function(resolve, reject) {
                            group.polygons.push(polygon),
                                _this4._saveUserPolygons(),
                                resolve(_this4._polygons)
                        })
                    }
                }, {
                    key: "updatePolygon",
                    value: function(polygon, group) {
                        var _this5 = this;
                        return this.$q(function(resolve, reject) {
                            _this5._saveUserPolygons(),
                                resolve(_this5._polygons)
                        })
                    }
                }, {
                    key: "deletePolygon",
                    value: function(polygon, group) {
                        var _this6 = this;
                        return this.$q(function(resolve, reject) {
                            if (!group.allowDrawing)
                                throw new Error("Cannot delete polygon from group " + group.title);
                            var index = group.polygons.indexOf(polygon);
                            if (!(index > -1))
                                throw new Error("Polygon " + polygon.name + " not found in group " + group.title);
                            group.polygons.splice(index, 1),
                                _this6._saveUserPolygons(),
                                resolve(_this6._polygons)
                        })
                    }
                }, {
                    key: "_loadUserPolygons",
                    value: function() {
                        return this.$localStorage.userPolygons || []
                    }
                }, {
                    key: "_saveUserPolygons",
                    value: function() {
                        this.$localStorage.userPolygons = this._polygons[0].polygons
                    }
                }]),
                PolygonService
        }();
        exports.default = PolygonService
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _w3wService = __webpack_require__(219)
            , _w3wService2 = _interopRequireDefault(_w3wService);
        exports.default = angular.module("emu.w3w-service", []).service("W3WService", _w3wService2.default)
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1,
                        descriptor.configurable = !0,
                    "value"in descriptor && (descriptor.writable = !0),
                        Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps),
                staticProps && defineProperties(Constructor, staticProps),
                    Constructor
            }
        }()
            , debug = __webpack_require__(32)("buildingheights:polygon-service")
            , PolygonService = function() {
            function PolygonService($q, $http, CONFIG) {
                "ngInject";
                _classCallCheck(this, PolygonService),
                    this.$q = $q,
                    this.$http = $http,
                    this.CONFIG = CONFIG
            }
            return PolygonService.$inject = ["$q", "$http", "CONFIG"],
                _createClass(PolygonService, [{
                    key: "reverseEncode",
                    value: function(lng, lat) {
                        var _this = this;
                        return this.$q(function(resolve, reject) {
                            _this.$http({
                                method: "GET",
                                url: _this.CONFIG.w3wEndpoint + "/reverse",
                                params: {
                                    coords: [lat, lng].join(","),
                                    format: "json",
                                    display: "full",
                                    key: _this.CONFIG.w3wKey
                                }
                            }).then(function(response) {
                                resolve(response.data)
                            }).catch(function(response) {
                                debug(response),
                                    reject(response)
                            })
                        })
                    }
                }]),
                PolygonService
        }();
        exports.default = PolygonService
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var runSetup = __webpack_require__(250)
            , setupOptions = __webpack_require__(248)
            , setupAPI = __webpack_require__(228)
            , Constants = __webpack_require__(7)
            , setupDraw = function(options, api) {
            options = setupOptions(options);
            var ctx = {
                options: options
            };
            api = setupAPI(ctx, api),
                ctx.api = api;
            var setup = runSetup(ctx);
            return api.onAdd = setup.onAdd,
                api.onRemove = setup.onRemove,
                api.types = Constants.types,
                api.options = options,
                api
        };
        module.exports = function(options) {
            setupDraw(options, this)
        }
    }
    , function(module, exports) {
        "use strict";
        function normalize(gj) {
            if (!gj || !gj.type)
                return null;
            var type = types[gj.type];
            return type ? "geometry" === type ? {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: gj
                }]
            } : "feature" === type ? {
                type: "FeatureCollection",
                features: [gj]
            } : "featurecollection" === type ? gj : void 0 : null
        }
        module.exports = normalize;
        var types = {
            Point: "geometry",
            MultiPoint: "geometry",
            LineString: "geometry",
            MultiLineString: "geometry",
            Polygon: "geometry",
            MultiPolygon: "geometry",
            GeometryCollection: "geometry",
            Feature: "feature",
            FeatureCollection: "featurecollection"
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function hint(str, options) {
            var gj, errors = [];
            if ("object" === ("undefined" == typeof str ? "undefined" : _typeof(str)))
                gj = str;
            else {
                if ("string" != typeof str)
                    return [{
                        message: "Expected string or object as input",
                        line: 0
                    }];
                try {
                    gj = jsonlint.parse(str)
                } catch (e) {
                    var match = e.message.match(/line (\d+)/)
                        , lineNumber = parseInt(match[1], 10);
                    return [{
                        line: lineNumber - 1,
                        message: e.message,
                        error: e
                    }]
                }
            }
            return errors = errors.concat(geojsonHintObject.hint(gj, options))
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
            }
            , jsonlint = __webpack_require__(225)
            , geojsonHintObject = __webpack_require__(223);
        module.exports.hint = hint
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function hint(gj, options) {
            function root(_) {
                if (options && options.noDuplicateMembers === !1 || !_.__duplicateProperties__ || errors.push({
                    message: "An object contained duplicate members, making parsing ambigous: " + _.__duplicateProperties__.join(", "),
                    line: _.__line__
                }),
                    !requiredProperty(_, "type", "string"))
                    if (types[_.type])
                        _ && types[_.type](_);
                    else {
                        var expectedType = typesLower[_.type.toLowerCase()];
                        void 0 !== expectedType ? errors.push({
                            message: "Expected " + expectedType + " but got " + _.type + " (case sensitive)",
                            line: _.__line__
                        }) : errors.push({
                            message: "The type " + _.type + " is unknown",
                            line: _.__line__
                        })
                    }
            }
            function everyIs(_, type) {
                return _.every(function(x) {
                    return null !== x && ("undefined" == typeof x ? "undefined" : _typeof(x)) === type
                })
            }
            function requiredProperty(_, name, type) {
                if ("undefined" == typeof _[name])
                    return errors.push({
                        message: '"' + name + '" member required',
                        line: _.__line__
                    });
                if ("array" === type) {
                    if (!Array.isArray(_[name]))
                        return errors.push({
                            message: '"' + name + '" member should be an array, but is an ' + _typeof(_[name]) + " instead",
                            line: _.__line__
                        })
                } else {
                    if ("object" === type && _[name] && "Object" !== _[name].constructor.name)
                        return errors.push({
                            message: '"' + name + '" member should be ' + type + ", but is an " + _[name].constructor.name + " instead",
                            line: _.__line__
                        });
                    if (type && _typeof(_[name]) !== type)
                        return errors.push({
                            message: '"' + name + '" member should be ' + type + ", but is an " + _typeof(_[name]) + " instead",
                            line: _.__line__
                        })
                }
            }
            function FeatureCollection(featureCollection) {
                if (crs(featureCollection),
                    bbox(featureCollection),
                void 0 !== featureCollection.properties && errors.push({
                    message: 'FeatureCollection object cannot contain a "properties" member',
                    line: featureCollection.__line__
                }),
                void 0 !== featureCollection.coordinates && errors.push({
                    message: 'FeatureCollection object cannot contain a "coordinates" member',
                    line: featureCollection.__line__
                }),
                    !requiredProperty(featureCollection, "features", "array")) {
                    if (!everyIs(featureCollection.features, "object"))
                        return errors.push({
                            message: "Every feature must be an object",
                            line: featureCollection.__line__
                        });
                    featureCollection.features.forEach(Feature)
                }
            }
            function position(_, line) {
                if (!Array.isArray(_))
                    return errors.push({
                        message: "position should be an array, is a " + ("undefined" == typeof _ ? "undefined" : _typeof(_)) + " instead",
                        line: _.__line__ || line
                    });
                if (_.length < 2)
                    return errors.push({
                        message: "position must have 2 or more elements",
                        line: _.__line__ || line
                    });
                if (_.length > 3)
                    return errors.push({
                        message: "position should not have more than 3 elements",
                        level: "message",
                        line: _.__line__ || line
                    });
                if (!everyIs(_, "number"))
                    return errors.push({
                        message: "each element in a position must be a number",
                        line: _.__line__ || line
                    });
                if (options && options.precisionWarning) {
                    if (precisionWarningCount === maxPrecisionWarnings)
                        return precisionWarningCount += 1,
                            errors.push({
                                message: "truncated warnings: we've encountered coordinate precision warning " + maxPrecisionWarnings + " times, no more warnings will be reported",
                                level: "message",
                                line: _.__line__ || line
                            });
                    maxPrecisionWarnings > precisionWarningCount && _.forEach(function(num) {
                        var precision = 0
                            , decimalStr = String(num).split(".")[1];
                        return void 0 !== decimalStr && (precision = decimalStr.length),
                            precision > maxPrecision ? (precisionWarningCount += 1,
                                errors.push({
                                    message: "precision of coordinates should be reduced",
                                    level: "message",
                                    line: _.__line__ || line
                                })) : void 0
                    })
                }
            }
            function positionArray(coords, type, depth, line) {
                if (void 0 === line && void 0 !== coords.__line__ && (line = coords.__line__),
                0 === depth)
                    return position(coords, line);
                if (1 === depth && type)
                    if ("LinearRing" === type) {
                        if (!Array.isArray(coords[coords.length - 1]))
                            return errors.push({
                                message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                                line: line
                            }),
                                !0;
                        if (coords.length < 4 && errors.push({
                            message: "a LinearRing of coordinates needs to have four or more positions",
                            line: line
                        }),
                        coords.length && (coords[coords.length - 1].length !== coords[0].length || !coords[coords.length - 1].every(function(pos, index) {
                            return coords[0][index] === pos
                        })))
                            return errors.push({
                                message: "the first and last positions in a LinearRing of coordinates must be the same",
                                line: line
                            }),
                                !0
                    } else if ("Line" === type && coords.length < 2)
                        return errors.push({
                            message: "a line needs to have two or more coordinates to be valid",
                            line: line
                        });
                if (Array.isArray(coords)) {
                    var results = coords.map(function(c) {
                        return positionArray(c, type, depth - 1, c.__line__ || line)
                    });
                    return results.some(function(r) {
                        return r
                    })
                }
                errors.push({
                    message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                    line: line
                })
            }
            function crs(_) {
                if (_.crs) {
                    var defaultCRSName = "urn:ogc:def:crs:OGC:1.3:CRS84";
                    "object" === _typeof(_.crs) && _.crs.properties && _.crs.properties.name === defaultCRSName ? errors.push({
                        message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed",
                        line: _.__line__
                    }) : errors.push({
                        message: "old-style crs member is not recommended",
                        line: _.__line__
                    })
                }
            }
            function bbox(_) {
                return _.bbox ? Array.isArray(_.bbox) ? (everyIs(_.bbox, "number") || errors.push({
                    message: "each element in a bbox member must be a number",
                    line: _.bbox.__line__
                }),
                4 !== _.bbox.length && 6 !== _.bbox.length && errors.push({
                    message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)",
                    line: _.bbox.__line__
                }),
                    errors.length) : void errors.push({
                    message: "bbox member must be an array of numbers, but is a " + _typeof(_.bbox),
                    line: _.__line__
                }) : void 0
            }
            function geometrySemantics(geom) {
                void 0 !== geom.properties && errors.push({
                    message: 'geometry object cannot contain a "properties" member',
                    line: geom.__line__
                }),
                void 0 !== geom.geometry && errors.push({
                    message: 'geometry object cannot contain a "geometry" member',
                    line: geom.__line__
                }),
                void 0 !== geom.features && errors.push({
                    message: 'geometry object cannot contain a "features" member',
                    line: geom.__line__
                })
            }
            function Point(point) {
                crs(point),
                    bbox(point),
                    geometrySemantics(point),
                requiredProperty(point, "coordinates", "array") || position(point.coordinates)
            }
            function Polygon(polygon) {
                crs(polygon),
                    bbox(polygon),
                requiredProperty(polygon, "coordinates", "array") || positionArray(polygon.coordinates, "LinearRing", 2) || rightHandRule(polygon, errors)
            }
            function MultiPolygon(multiPolygon) {
                crs(multiPolygon),
                    bbox(multiPolygon),
                requiredProperty(multiPolygon, "coordinates", "array") || positionArray(multiPolygon.coordinates, "LinearRing", 3) || rightHandRule(multiPolygon, errors)
            }
            function LineString(lineString) {
                crs(lineString),
                    bbox(lineString),
                requiredProperty(lineString, "coordinates", "array") || positionArray(lineString.coordinates, "Line", 1)
            }
            function MultiLineString(multiLineString) {
                crs(multiLineString),
                    bbox(multiLineString),
                requiredProperty(multiLineString, "coordinates", "array") || positionArray(multiLineString.coordinates, "Line", 2)
            }
            function MultiPoint(multiPoint) {
                crs(multiPoint),
                    bbox(multiPoint),
                requiredProperty(multiPoint, "coordinates", "array") || positionArray(multiPoint.coordinates, "", 1)
            }
            function GeometryCollection(geometryCollection) {
                crs(geometryCollection),
                    bbox(geometryCollection),
                requiredProperty(geometryCollection, "geometries", "array") || (everyIs(geometryCollection.geometries, "object") || errors.push({
                    message: "The geometries array in a GeometryCollection must contain only geometry objects",
                    line: geometryCollection.__line__
                }),
                1 === geometryCollection.geometries.length && errors.push({
                    message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type",
                    line: geometryCollection.geometries.__line__
                }),
                    geometryCollection.geometries.forEach(function(geometry) {
                        geometry && ("GeometryCollection" === geometry.type && errors.push({
                            message: "GeometryCollection should avoid nested geometry collections",
                            line: geometryCollection.geometries.__line__
                        }),
                            root(geometry))
                    }))
            }
            function Feature(feature) {
                crs(feature),
                    bbox(feature),
                void 0 !== feature.id && "string" != typeof feature.id && "number" != typeof feature.id && errors.push({
                    message: 'Feature "id" member must have a string or number value',
                    line: feature.__line__
                }),
                void 0 !== feature.features && errors.push({
                    message: 'Feature object cannot contain a "features" member',
                    line: feature.__line__
                }),
                void 0 !== feature.coordinates && errors.push({
                    message: 'Feature object cannot contain a "coordinates" member',
                    line: feature.__line__
                }),
                "Feature" !== feature.type && errors.push({
                    message: "GeoJSON features must have a type=feature member",
                    line: feature.__line__
                }),
                    requiredProperty(feature, "properties", "object"),
                requiredProperty(feature, "geometry", "object") || feature.geometry && root(feature.geometry)
            }
            var errors = []
                , precisionWarningCount = 0
                , maxPrecisionWarnings = 10
                , maxPrecision = 6
                , types = {
                Point: Point,
                Feature: Feature,
                MultiPoint: MultiPoint,
                LineString: LineString,
                MultiLineString: MultiLineString,
                FeatureCollection: FeatureCollection,
                GeometryCollection: GeometryCollection,
                Polygon: Polygon,
                MultiPolygon: MultiPolygon
            }
                , typesLower = Object.keys(types).reduce(function(prev, curr) {
                return prev[curr.toLowerCase()] = curr,
                    prev
            }, {});
            return "object" !== ("undefined" == typeof gj ? "undefined" : _typeof(gj)) || null === gj || void 0 === gj ? (errors.push({
                message: "The root of a GeoJSON object must be an object.",
                line: 0
            }),
                errors) : (root(gj),
                errors.forEach(function(err) {
                    ({}).hasOwnProperty.call(err, "line") && void 0 === err.line && delete err.line
                }),
                errors)
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
            }
            , rightHandRule = __webpack_require__(224);
        module.exports.hint = hint
    }
    , function(module, exports) {
        "use strict";
        function rad(x) {
            return x * Math.PI / 180
        }
        function isRingClockwise(coords) {
            var area = 0;
            if (coords.length > 2)
                for (var p1, p2, i = 0; i < coords.length - 1; i++)
                    p1 = coords[i],
                        p2 = coords[i + 1],
                        area += rad(p2[0] - p1[0]) * (2 + Math.sin(rad(p1[1])) + Math.sin(rad(p2[1])));
            return area >= 0
        }
        function isPolyRHR(coords) {
            if (coords && coords.length > 0) {
                if (isRingClockwise(coords[0]))
                    return !1;
                var interiorCoords = coords.slice(1, coords.length);
                if (!interiorCoords.every(isRingClockwise))
                    return !1
            }
            return !0
        }
        function rightHandRule(geometry) {
            return "Polygon" === geometry.type ? isPolyRHR(geometry.coordinates) : "MultiPolygon" === geometry.type ? geometry.coordinates.every(isPolyRHR) : void 0
        }
        module.exports = function(geometry, errors) {
            rightHandRule(geometry) || errors.push({
                message: "Polygons and MultiPolygons should follow the right-hand rule",
                level: "message",
                line: geometry.__line__
            })
        }
    }
    , function(module, exports, __webpack_require__) {
        (function(process, module) {
                "use strict";
                var jsonlint = function() {
                    function Parser() {
                        this.yy = {}
                    }
                    var o = function(k, v, _o, l) {
                        for (_o = _o || {},
                                 l = k.length; l--; _o[k[l]] = v)
                            ;
                        return _o
                    }
                        , $V0 = [1, 12]
                        , $V1 = [1, 13]
                        , $V2 = [1, 9]
                        , $V3 = [1, 10]
                        , $V4 = [1, 11]
                        , $V5 = [1, 14]
                        , $V6 = [1, 15]
                        , $V7 = [14, 18, 22, 24]
                        , $V8 = [18, 22]
                        , $V9 = [22, 24]
                        , parser = {
                        trace: function() {},
                        yy: {},
                        symbols_: {
                            error: 2,
                            JSONString: 3,
                            STRING: 4,
                            JSONNumber: 5,
                            NUMBER: 6,
                            JSONNullLiteral: 7,
                            NULL: 8,
                            JSONBooleanLiteral: 9,
                            TRUE: 10,
                            FALSE: 11,
                            JSONText: 12,
                            JSONValue: 13,
                            EOF: 14,
                            JSONObject: 15,
                            JSONArray: 16,
                            "{": 17,
                            "}": 18,
                            JSONMemberList: 19,
                            JSONMember: 20,
                            ":": 21,
                            ",": 22,
                            "[": 23,
                            "]": 24,
                            JSONElementList: 25,
                            $accept: 0,
                            $end: 1
                        },
                        terminals_: {
                            2: "error",
                            4: "STRING",
                            6: "NUMBER",
                            8: "NULL",
                            10: "TRUE",
                            11: "FALSE",
                            14: "EOF",
                            17: "{",
                            18: "}",
                            21: ":",
                            22: ",",
                            23: "[",
                            24: "]"
                        },
                        productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
                        performAction: function(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                            var $0 = $$.length - 1;
                            switch (yystate) {
                                case 1:
                                    this.$ = yytext.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "\x0B").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                                    break;
                                case 2:
                                    this.$ = Number(yytext);
                                    break;
                                case 3:
                                    this.$ = null;
                                    break;
                                case 4:
                                    this.$ = !0;
                                    break;
                                case 5:
                                    this.$ = !1;
                                    break;
                                case 6:
                                    return this.$ = $$[$0 - 1];
                                case 13:
                                    this.$ = {},
                                        Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                    break;
                                case 14:
                                case 19:
                                    this.$ = $$[$0 - 1],
                                        Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                    break;
                                case 15:
                                    this.$ = [$$[$0 - 2], $$[$0]];
                                    break;
                                case 16:
                                    this.$ = {},
                                        this.$[$$[$0][0]] = $$[$0][1];
                                    break;
                                case 17:
                                    this.$ = $$[$0 - 2],
                                    void 0 !== $$[$0 - 2][$$[$0][0]] && (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", {
                                        value: [],
                                        enumerable: !1
                                    }),
                                        this.$.__duplicateProperties__.push($$[$0][0])),
                                        $$[$0 - 2][$$[$0][0]] = $$[$0][1];
                                    break;
                                case 18:
                                    this.$ = [],
                                        Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                    break;
                                case 20:
                                    this.$ = [$$[$0]];
                                    break;
                                case 21:
                                    this.$ = $$[$0 - 2],
                                        $$[$0 - 2].push($$[$0])
                            }
                        },
                        table: [{
                            3: 5,
                            4: $V0,
                            5: 6,
                            6: $V1,
                            7: 3,
                            8: $V2,
                            9: 4,
                            10: $V3,
                            11: $V4,
                            12: 1,
                            13: 2,
                            15: 7,
                            16: 8,
                            17: $V5,
                            23: $V6
                        }, {
                            1: [3]
                        }, {
                            14: [1, 16]
                        }, o($V7, [2, 7]), o($V7, [2, 8]), o($V7, [2, 9]), o($V7, [2, 10]), o($V7, [2, 11]), o($V7, [2, 12]), o($V7, [2, 3]), o($V7, [2, 4]), o($V7, [2, 5]), o([14, 18, 21, 22, 24], [2, 1]), o($V7, [2, 2]), {
                            3: 20,
                            4: $V0,
                            18: [1, 17],
                            19: 18,
                            20: 19
                        }, {
                            3: 5,
                            4: $V0,
                            5: 6,
                            6: $V1,
                            7: 3,
                            8: $V2,
                            9: 4,
                            10: $V3,
                            11: $V4,
                            13: 23,
                            15: 7,
                            16: 8,
                            17: $V5,
                            23: $V6,
                            24: [1, 21],
                            25: 22
                        }, {
                            1: [2, 6]
                        }, o($V7, [2, 13]), {
                            18: [1, 24],
                            22: [1, 25]
                        }, o($V8, [2, 16]), {
                            21: [1, 26]
                        }, o($V7, [2, 18]), {
                            22: [1, 28],
                            24: [1, 27]
                        }, o($V9, [2, 20]), o($V7, [2, 14]), {
                            3: 20,
                            4: $V0,
                            20: 29
                        }, {
                            3: 5,
                            4: $V0,
                            5: 6,
                            6: $V1,
                            7: 3,
                            8: $V2,
                            9: 4,
                            10: $V3,
                            11: $V4,
                            13: 30,
                            15: 7,
                            16: 8,
                            17: $V5,
                            23: $V6
                        }, o($V7, [2, 19]), {
                            3: 5,
                            4: $V0,
                            5: 6,
                            6: $V1,
                            7: 3,
                            8: $V2,
                            9: 4,
                            10: $V3,
                            11: $V4,
                            13: 31,
                            15: 7,
                            16: 8,
                            17: $V5,
                            23: $V6
                        }, o($V8, [2, 17]), o($V8, [2, 15]), o($V9, [2, 21])],
                        defaultActions: {
                            16: [2, 6]
                        },
                        parseError: function(str, hash) {
                            if (!hash.recoverable) {
                                var _parseError = function(msg, hash) {
                                    this.message = msg,
                                        this.hash = hash
                                };
                                throw _parseError.prototype = Error,
                                    new _parseError(str,hash)
                            }
                            this.trace(str)
                        },
                        parse: function(input) {
                            var self = this
                                , stack = [0]
                                , vstack = [null]
                                , lstack = []
                                , table = this.table
                                , yytext = ""
                                , yylineno = 0
                                , yyleng = 0
                                , recovering = 0
                                , TERROR = 2
                                , EOF = 1
                                , args = lstack.slice.call(arguments, 1)
                                , lexer = Object.create(this.lexer)
                                , sharedState = {
                                yy: {}
                            };
                            for (var k in this.yy)
                                Object.prototype.hasOwnProperty.call(this.yy, k) && (sharedState.yy[k] = this.yy[k]);
                            lexer.setInput(input, sharedState.yy),
                                sharedState.yy.lexer = lexer,
                                sharedState.yy.parser = this,
                            "undefined" == typeof lexer.yylloc && (lexer.yylloc = {});
                            var yyloc = lexer.yylloc;
                            lstack.push(yyloc);
                            var ranges = lexer.options && lexer.options.ranges;
                            "function" == typeof sharedState.yy.parseError ? this.parseError = sharedState.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                            for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, lex = function() {
                                var token;
                                return token = lexer.lex() || EOF,
                                "number" != typeof token && (token = self.symbols_[token] || token),
                                    token
                            }, yyval = {}; ; ) {
                                if (state = stack[stack.length - 1],
                                    this.defaultActions[state] ? action = this.defaultActions[state] : (null !== symbol && "undefined" != typeof symbol || (symbol = lex()),
                                        action = table[state] && table[state][symbol]),
                                "undefined" == typeof action || !action.length || !action[0]) {
                                    var errStr = "";
                                    expected = [];
                                    for (p in table[state])
                                        this.terminals_[p] && p > TERROR && expected.push("'" + this.terminals_[p] + "'");
                                    errStr = lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"),
                                        this.parseError(errStr, {
                                            text: lexer.match,
                                            token: this.terminals_[symbol] || symbol,
                                            line: lexer.yylineno,
                                            loc: yyloc,
                                            expected: expected
                                        })
                                }
                                if (action[0]instanceof Array && action.length > 1)
                                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                                switch (action[0]) {
                                    case 1:
                                        stack.push(symbol),
                                            vstack.push(lexer.yytext),
                                            lstack.push(lexer.yylloc),
                                            stack.push(action[1]),
                                            symbol = null,
                                            preErrorSymbol ? (symbol = preErrorSymbol,
                                                preErrorSymbol = null) : (yyleng = lexer.yyleng,
                                                yytext = lexer.yytext,
                                                yylineno = lexer.yylineno,
                                                yyloc = lexer.yylloc,
                                            recovering > 0 && recovering--);
                                        break;
                                    case 2:
                                        if (len = this.productions_[action[1]][1],
                                            yyval.$ = vstack[vstack.length - len],
                                            yyval._$ = {
                                                first_line: lstack[lstack.length - (len || 1)].first_line,
                                                last_line: lstack[lstack.length - 1].last_line,
                                                first_column: lstack[lstack.length - (len || 1)].first_column,
                                                last_column: lstack[lstack.length - 1].last_column
                                            },
                                        ranges && (yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]]),
                                            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args)),
                                        "undefined" != typeof r)
                                            return r;
                                        len && (stack = stack.slice(0, -1 * len * 2),
                                            vstack = vstack.slice(0, -1 * len),
                                            lstack = lstack.slice(0, -1 * len)),
                                            stack.push(this.productions_[action[1]][0]),
                                            vstack.push(yyval.$),
                                            lstack.push(yyval._$),
                                            newState = table[stack[stack.length - 2]][stack[stack.length - 1]],
                                            stack.push(newState);
                                        break;
                                    case 3:
                                        return !0
                                }
                            }
                            return !0
                        }
                    }
                        , lexer = function() {
                        var lexer = {
                            EOF: 1,
                            parseError: function(str, hash) {
                                if (!this.yy.parser)
                                    throw new Error(str);
                                this.yy.parser.parseError(str, hash)
                            },
                            setInput: function(input, yy) {
                                return this.yy = yy || this.yy || {},
                                    this._input = input,
                                    this._more = this._backtrack = this.done = !1,
                                    this.yylineno = this.yyleng = 0,
                                    this.yytext = this.matched = this.match = "",
                                    this.conditionStack = ["INITIAL"],
                                    this.yylloc = {
                                        first_line: 1,
                                        first_column: 0,
                                        last_line: 1,
                                        last_column: 0
                                    },
                                this.options.ranges && (this.yylloc.range = [0, 0]),
                                    this.offset = 0,
                                    this
                            },
                            input: function() {
                                var ch = this._input[0];
                                this.yytext += ch,
                                    this.yyleng++,
                                    this.offset++,
                                    this.match += ch,
                                    this.matched += ch;
                                var lines = ch.match(/(?:\r\n?|\n).*/g);
                                return lines ? (this.yylineno++,
                                    this.yylloc.last_line++) : this.yylloc.last_column++,
                                this.options.ranges && this.yylloc.range[1]++,
                                    this._input = this._input.slice(1),
                                    ch
                            },
                            unput: function(ch) {
                                var len = ch.length
                                    , lines = ch.split(/(?:\r\n?|\n)/g);
                                this._input = ch + this._input,
                                    this.yytext = this.yytext.substr(0, this.yytext.length - len),
                                    this.offset -= len;
                                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                                this.match = this.match.substr(0, this.match.length - 1),
                                    this.matched = this.matched.substr(0, this.matched.length - 1),
                                lines.length - 1 && (this.yylineno -= lines.length - 1);
                                var r = this.yylloc.range;
                                return this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                                },
                                this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - len]),
                                    this.yyleng = this.yytext.length,
                                    this
                            },
                            more: function() {
                                return this._more = !0,
                                    this
                            },
                            reject: function() {
                                return this.options.backtrack_lexer ? (this._backtrack = !0,
                                    this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                            },
                            less: function(n) {
                                this.unput(this.match.slice(n))
                            },
                            pastInput: function() {
                                var past = this.matched.substr(0, this.matched.length - this.match.length);
                                return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
                            },
                            upcomingInput: function() {
                                var next = this.match;
                                return next.length < 20 && (next += this._input.substr(0, 20 - next.length)),
                                    (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
                            },
                            showPosition: function() {
                                var pre = this.pastInput()
                                    , c = new Array(pre.length + 1).join("-");
                                return pre + this.upcomingInput() + "\n" + c + "^"
                            },
                            test_match: function(match, indexed_rule) {
                                var token, lines, backup;
                                if (this.options.backtrack_lexer && (backup = {
                                    yylineno: this.yylineno,
                                    yylloc: {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.last_line,
                                        first_column: this.yylloc.first_column,
                                        last_column: this.yylloc.last_column
                                    },
                                    yytext: this.yytext,
                                    match: this.match,
                                    matches: this.matches,
                                    matched: this.matched,
                                    yyleng: this.yyleng,
                                    offset: this.offset,
                                    _more: this._more,
                                    _input: this._input,
                                    yy: this.yy,
                                    conditionStack: this.conditionStack.slice(0),
                                    done: this.done
                                },
                                this.options.ranges && (backup.yylloc.range = this.yylloc.range.slice(0))),
                                    lines = match[0].match(/(?:\r\n?|\n).*/g),
                                lines && (this.yylineno += lines.length),
                                    this.yylloc = {
                                        first_line: this.yylloc.last_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.last_column,
                                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                                    },
                                    this.yytext += match[0],
                                    this.match += match[0],
                                    this.matches = match,
                                    this.yyleng = this.yytext.length,
                                this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]),
                                    this._more = !1,
                                    this._backtrack = !1,
                                    this._input = this._input.slice(match[0].length),
                                    this.matched += match[0],
                                    token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]),
                                this.done && this._input && (this.done = !1),
                                    token)
                                    return token;
                                if (this._backtrack) {
                                    for (var k in backup)
                                        this[k] = backup[k];
                                    return !1
                                }
                                return !1
                            },
                            next: function() {
                                if (this.done)
                                    return this.EOF;
                                this._input || (this.done = !0);
                                var token, match, tempMatch, index;
                                this._more || (this.yytext = "",
                                    this.match = "");
                                for (var rules = this._currentRules(), i = 0; i < rules.length; i++)
                                    if (tempMatch = this._input.match(this.rules[rules[i]]),
                                    tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                                        if (match = tempMatch,
                                            index = i,
                                            this.options.backtrack_lexer) {
                                            if (token = this.test_match(tempMatch, rules[i]),
                                            token !== !1)
                                                return token;
                                            if (this._backtrack) {
                                                match = !1;
                                                continue
                                            }
                                            return !1
                                        }
                                        if (!this.options.flex)
                                            break
                                    }
                                return match ? (token = this.test_match(match, rules[index]),
                                    token !== !1 ? token : !1) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                            },
                            lex: function() {
                                var r = this.next();
                                return r ? r : this.lex()
                            },
                            begin: function(condition) {
                                this.conditionStack.push(condition)
                            },
                            popState: function() {
                                var n = this.conditionStack.length - 1;
                                return n > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                            },
                            _currentRules: function() {
                                return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                            },
                            topState: function(n) {
                                return n = this.conditionStack.length - 1 - Math.abs(n || 0),
                                    n >= 0 ? this.conditionStack[n] : "INITIAL"
                            },
                            pushState: function(condition) {
                                this.begin(condition)
                            },
                            stateStackSize: function() {
                                return this.conditionStack.length
                            },
                            options: {},
                            performAction: function(yy, yy_, $avoiding_name_collisions, YY_START) {
                                switch ($avoiding_name_collisions) {
                                    case 0:
                                        break;
                                    case 1:
                                        return 6;
                                    case 2:
                                        return yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2),
                                            4;
                                    case 3:
                                        return 17;
                                    case 4:
                                        return 18;
                                    case 5:
                                        return 23;
                                    case 6:
                                        return 24;
                                    case 7:
                                        return 22;
                                    case 8:
                                        return 21;
                                    case 9:
                                        return 10;
                                    case 10:
                                        return 11;
                                    case 11:
                                        return 8;
                                    case 12:
                                        return 14;
                                    case 13:
                                        return "INVALID"
                                }
                            },
                            rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
                            conditions: {
                                INITIAL: {
                                    rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                    inclusive: !0
                                }
                            }
                        };
                        return lexer
                    }();
                    return parser.lexer = lexer,
                        Parser.prototype = parser,
                        parser.Parser = Parser,
                        new Parser
                }();
                exports.parser = jsonlint,
                    exports.Parser = jsonlint.Parser,
                    exports.parse = function() {
                        return jsonlint.parse.apply(jsonlint, arguments)
                    }
                    ,
                    exports.main = function(args) {
                        args[1] || (console.log("Usage: " + args[0] + " FILE"),
                            process.exit(1));
                        var source = __webpack_require__(549).readFileSync(__webpack_require__(550).normalize(args[1]), "utf8");
                        return exports.parser.parse(source)
                    }
                    ,
                "undefined" != typeof module && __webpack_require__.c[0] === module && exports.main(process.argv.slice(1))
            }
        ).call(exports, __webpack_require__(116), __webpack_require__(117)(module))
    }
    , function(module, exports, __webpack_require__) {
        (function(global, module) {
                "use strict";
                function arrayFilter(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
                        var value = array[index];
                        predicate(value, index, array) && (result[resIndex++] = value)
                    }
                    return result
                }
                function arrayPush(array, values) {
                    for (var index = -1, length = values.length, offset = array.length; ++index < length; )
                        array[offset + index] = values[index];
                    return array
                }
                function arraySome(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; )
                        if (predicate(array[index], index, array))
                            return !0;
                    return !1
                }
                function baseTimes(n, iteratee) {
                    for (var index = -1, result = Array(n); ++index < n; )
                        result[index] = iteratee(index);
                    return result
                }
                function baseUnary(func) {
                    return function(value) {
                        return func(value)
                    }
                }
                function cacheHas(cache, key) {
                    return cache.has(key)
                }
                function getValue(object, key) {
                    return null == object ? void 0 : object[key]
                }
                function mapToArray(map) {
                    var index = -1
                        , result = Array(map.size);
                    return map.forEach(function(value, key) {
                        result[++index] = [key, value]
                    }),
                        result
                }
                function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg))
                    }
                }
                function setToArray(set) {
                    var index = -1
                        , result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = value
                    }),
                        result
                }
                function Hash(entries) {
                    var index = -1
                        , length = null == entries ? 0 : entries.length;
                    for (this.clear(); ++index < length; ) {
                        var entry = entries[index];
                        this.set(entry[0], entry[1])
                    }
                }
                function hashClear() {
                    this.__data__ = nativeCreate ? nativeCreate(null) : {},
                        this.size = 0
                }
                function hashDelete(key) {
                    var result = this.has(key) && delete this.__data__[key];
                    return this.size -= result ? 1 : 0,
                        result
                }
                function hashGet(key) {
                    var data = this.__data__;
                    if (nativeCreate) {
                        var result = data[key];
                        return result === HASH_UNDEFINED ? void 0 : result
                    }
                    return hasOwnProperty.call(data, key) ? data[key] : void 0
                }
                function hashHas(key) {
                    var data = this.__data__;
                    return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key)
                }
                function hashSet(key, value) {
                    var data = this.__data__;
                    return this.size += this.has(key) ? 0 : 1,
                        data[key] = nativeCreate && void 0 === value ? HASH_UNDEFINED : value,
                        this
                }
                function ListCache(entries) {
                    var index = -1
                        , length = null == entries ? 0 : entries.length;
                    for (this.clear(); ++index < length; ) {
                        var entry = entries[index];
                        this.set(entry[0], entry[1])
                    }
                }
                function listCacheClear() {
                    this.__data__ = [],
                        this.size = 0
                }
                function listCacheDelete(key) {
                    var data = this.__data__
                        , index = assocIndexOf(data, key);
                    if (0 > index)
                        return !1;
                    var lastIndex = data.length - 1;
                    return index == lastIndex ? data.pop() : splice.call(data, index, 1),
                        --this.size,
                        !0
                }
                function listCacheGet(key) {
                    var data = this.__data__
                        , index = assocIndexOf(data, key);
                    return 0 > index ? void 0 : data[index][1]
                }
                function listCacheHas(key) {
                    return assocIndexOf(this.__data__, key) > -1
                }
                function listCacheSet(key, value) {
                    var data = this.__data__
                        , index = assocIndexOf(data, key);
                    return 0 > index ? (++this.size,
                        data.push([key, value])) : data[index][1] = value,
                        this
                }
                function MapCache(entries) {
                    var index = -1
                        , length = null == entries ? 0 : entries.length;
                    for (this.clear(); ++index < length; ) {
                        var entry = entries[index];
                        this.set(entry[0], entry[1])
                    }
                }
                function mapCacheClear() {
                    this.size = 0,
                        this.__data__ = {
                            hash: new Hash,
                            map: new (Map || ListCache),
                            string: new Hash
                        }
                }
                function mapCacheDelete(key) {
                    var result = getMapData(this, key).delete(key);
                    return this.size -= result ? 1 : 0,
                        result
                }
                function mapCacheGet(key) {
                    return getMapData(this, key).get(key)
                }
                function mapCacheHas(key) {
                    return getMapData(this, key).has(key)
                }
                function mapCacheSet(key, value) {
                    var data = getMapData(this, key)
                        , size = data.size;
                    return data.set(key, value),
                        this.size += data.size == size ? 0 : 1,
                        this
                }
                function SetCache(values) {
                    var index = -1
                        , length = null == values ? 0 : values.length;
                    for (this.__data__ = new MapCache; ++index < length; )
                        this.add(values[index])
                }
                function setCacheAdd(value) {
                    return this.__data__.set(value, HASH_UNDEFINED),
                        this
                }
                function setCacheHas(value) {
                    return this.__data__.has(value)
                }
                function Stack(entries) {
                    var data = this.__data__ = new ListCache(entries);
                    this.size = data.size
                }
                function stackClear() {
                    this.__data__ = new ListCache,
                        this.size = 0
                }
                function stackDelete(key) {
                    var data = this.__data__
                        , result = data.delete(key);
                    return this.size = data.size,
                        result
                }
                function stackGet(key) {
                    return this.__data__.get(key)
                }
                function stackHas(key) {
                    return this.__data__.has(key)
                }
                function stackSet(key, value) {
                    var data = this.__data__;
                    if (data instanceof ListCache) {
                        var pairs = data.__data__;
                        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1)
                            return pairs.push([key, value]),
                                this.size = ++data.size,
                                this;
                        data = this.__data__ = new MapCache(pairs)
                    }
                    return data.set(key, value),
                        this.size = data.size,
                        this
                }
                function arrayLikeKeys(value, inherited) {
                    var isArr = isArray(value)
                        , isArg = !isArr && isArguments(value)
                        , isBuff = !isArr && !isArg && isBuffer(value)
                        , isType = !isArr && !isArg && !isBuff && isTypedArray(value)
                        , skipIndexes = isArr || isArg || isBuff || isType
                        , result = skipIndexes ? baseTimes(value.length, String) : []
                        , length = result.length;
                    for (var key in value)
                        !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key);
                    return result
                }
                function assocIndexOf(array, key) {
                    for (var length = array.length; length--; )
                        if (eq(array[length][0], key))
                            return length;
                    return -1
                }
                function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                    var result = keysFunc(object);
                    return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
                }
                function baseGetTag(value) {
                    return null == value ? void 0 === value ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value)
                }
                function baseIsArguments(value) {
                    return isObjectLike(value) && baseGetTag(value) == argsTag
                }
                function baseIsEqual(value, other, bitmask, customizer, stack) {
                    return value === other ? !0 : null == value || null == other || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)
                }
                function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                    var objIsArr = isArray(object)
                        , othIsArr = isArray(other)
                        , objTag = objIsArr ? arrayTag : getTag(object)
                        , othTag = othIsArr ? arrayTag : getTag(other);
                    objTag = objTag == argsTag ? objectTag : objTag,
                        othTag = othTag == argsTag ? objectTag : othTag;
                    var objIsObj = objTag == objectTag
                        , othIsObj = othTag == objectTag
                        , isSameTag = objTag == othTag;
                    if (isSameTag && isBuffer(object)) {
                        if (!isBuffer(other))
                            return !1;
                        objIsArr = !0,
                            objIsObj = !1
                    }
                    if (isSameTag && !objIsObj)
                        return stack || (stack = new Stack),
                            objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
                    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__")
                            , othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                        if (objIsWrapped || othIsWrapped) {
                            var objUnwrapped = objIsWrapped ? object.value() : object
                                , othUnwrapped = othIsWrapped ? other.value() : other;
                            return stack || (stack = new Stack),
                                equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
                        }
                    }
                    return isSameTag ? (stack || (stack = new Stack),
                        equalObjects(object, other, bitmask, customizer, equalFunc, stack)) : !1
                }
                function baseIsNative(value) {
                    if (!isObject(value) || isMasked(value))
                        return !1;
                    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                    return pattern.test(toSource(value))
                }
                function baseIsTypedArray(value) {
                    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
                }
                function baseKeys(object) {
                    if (!isPrototype(object))
                        return nativeKeys(object);
                    var result = [];
                    for (var key in Object(object))
                        hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
                    return result
                }
                function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG
                        , arrLength = array.length
                        , othLength = other.length;
                    if (arrLength != othLength && !(isPartial && othLength > arrLength))
                        return !1;
                    var stacked = stack.get(array);
                    if (stacked && stack.get(other))
                        return stacked == other;
                    var index = -1
                        , result = !0
                        , seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : void 0;
                    for (stack.set(array, other),
                             stack.set(other, array); ++index < arrLength; ) {
                        var arrValue = array[index]
                            , othValue = other[index];
                        if (customizer)
                            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
                        if (void 0 !== compared) {
                            if (compared)
                                continue;
                            result = !1;
                            break
                        }
                        if (seen) {
                            if (!arraySome(other, function(othValue, othIndex) {
                                return cacheHas(seen, othIndex) || arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack) ? void 0 : seen.push(othIndex)
                            })) {
                                result = !1;
                                break
                            }
                        } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) {
                            result = !1;
                            break
                        }
                    }
                    return stack.delete(array),
                        stack.delete(other),
                        result
                }
                function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                    switch (tag) {
                        case dataViewTag:
                            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset)
                                return !1;
                            object = object.buffer,
                                other = other.buffer;
                        case arrayBufferTag:
                            return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));
                        case boolTag:
                        case dateTag:
                        case numberTag:
                            return eq(+object, +other);
                        case errorTag:
                            return object.name == other.name && object.message == other.message;
                        case regexpTag:
                        case stringTag:
                            return object == other + "";
                        case mapTag:
                            var convert = mapToArray;
                        case setTag:
                            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                            if (convert || (convert = setToArray),
                            object.size != other.size && !isPartial)
                                return !1;
                            var stacked = stack.get(object);
                            if (stacked)
                                return stacked == other;
                            bitmask |= COMPARE_UNORDERED_FLAG,
                                stack.set(object, other);
                            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                            return stack.delete(object),
                                result;
                        case symbolTag:
                            if (symbolValueOf)
                                return symbolValueOf.call(object) == symbolValueOf.call(other)
                    }
                    return !1
                }
                function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG
                        , objProps = getAllKeys(object)
                        , objLength = objProps.length
                        , othProps = getAllKeys(other)
                        , othLength = othProps.length;
                    if (objLength != othLength && !isPartial)
                        return !1;
                    for (var index = objLength; index--; ) {
                        var key = objProps[index];
                        if (!(isPartial ? key in other : hasOwnProperty.call(other, key)))
                            return !1
                    }
                    var stacked = stack.get(object);
                    if (stacked && stack.get(other))
                        return stacked == other;
                    var result = !0;
                    stack.set(object, other),
                        stack.set(other, object);
                    for (var skipCtor = isPartial; ++index < objLength; ) {
                        key = objProps[index];
                        var objValue = object[key]
                            , othValue = other[key];
                        if (customizer)
                            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
                        if (!(void 0 === compared ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                            result = !1;
                            break
                        }
                        skipCtor || (skipCtor = "constructor" == key)
                    }
                    if (result && !skipCtor) {
                        var objCtor = object.constructor
                            , othCtor = other.constructor;
                        objCtor != othCtor && "constructor"in object && "constructor"in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1)
                    }
                    return stack.delete(object),
                        stack.delete(other),
                        result
                }
                function getAllKeys(object) {
                    return baseGetAllKeys(object, keys, getSymbols)
                }
                function getMapData(map, key) {
                    var data = map.__data__;
                    return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map
                }
                function getNative(object, key) {
                    var value = getValue(object, key);
                    return baseIsNative(value) ? value : void 0
                }
                function getRawTag(value) {
                    var isOwn = hasOwnProperty.call(value, symToStringTag)
                        , tag = value[symToStringTag];
                    try {
                        value[symToStringTag] = void 0;
                        var unmasked = !0
                    } catch (e) {}
                    var result = nativeObjectToString.call(value);
                    return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]),
                        result
                }
                function isIndex(value, length) {
                    return length = null == length ? MAX_SAFE_INTEGER : length,
                    !!length && ("number" == typeof value || reIsUint.test(value)) && value > -1 && value % 1 == 0 && length > value
                }
                function isKeyable(value) {
                    var type = "undefined" == typeof value ? "undefined" : _typeof(value);
                    return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value
                }
                function isMasked(func) {
                    return !!maskSrcKey && maskSrcKey in func
                }
                function isPrototype(value) {
                    var Ctor = value && value.constructor
                        , proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
                    return value === proto
                }
                function objectToString(value) {
                    return nativeObjectToString.call(value)
                }
                function toSource(func) {
                    if (null != func) {
                        try {
                            return funcToString.call(func)
                        } catch (e) {}
                        try {
                            return func + ""
                        } catch (e) {}
                    }
                    return ""
                }
                function eq(value, other) {
                    return value === other || value !== value && other !== other
                }
                function isArrayLike(value) {
                    return null != value && isLength(value.length) && !isFunction(value)
                }
                function isEqual(value, other) {
                    return baseIsEqual(value, other)
                }
                function isFunction(value) {
                    if (!isObject(value))
                        return !1;
                    var tag = baseGetTag(value);
                    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
                }
                function isLength(value) {
                    return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value
                }
                function isObject(value) {
                    var type = "undefined" == typeof value ? "undefined" : _typeof(value);
                    return null != value && ("object" == type || "function" == type)
                }
                function isObjectLike(value) {
                    return null != value && "object" == ("undefined" == typeof value ? "undefined" : _typeof(value))
                }
                function keys(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
                }
                function stubArray() {
                    return []
                }
                function stubFalse() {
                    return !1
                }
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                        return typeof obj
                    }
                    : function(obj) {
                        return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
                    }
                    , LARGE_ARRAY_SIZE = 200
                    , HASH_UNDEFINED = "__lodash_hash_undefined__"
                    , COMPARE_PARTIAL_FLAG = 1
                    , COMPARE_UNORDERED_FLAG = 2
                    , MAX_SAFE_INTEGER = 9007199254740991
                    , argsTag = "[object Arguments]"
                    , arrayTag = "[object Array]"
                    , asyncTag = "[object AsyncFunction]"
                    , boolTag = "[object Boolean]"
                    , dateTag = "[object Date]"
                    , errorTag = "[object Error]"
                    , funcTag = "[object Function]"
                    , genTag = "[object GeneratorFunction]"
                    , mapTag = "[object Map]"
                    , numberTag = "[object Number]"
                    , nullTag = "[object Null]"
                    , objectTag = "[object Object]"
                    , promiseTag = "[object Promise]"
                    , proxyTag = "[object Proxy]"
                    , regexpTag = "[object RegExp]"
                    , setTag = "[object Set]"
                    , stringTag = "[object String]"
                    , symbolTag = "[object Symbol]"
                    , undefinedTag = "[object Undefined]"
                    , weakMapTag = "[object WeakMap]"
                    , arrayBufferTag = "[object ArrayBuffer]"
                    , dataViewTag = "[object DataView]"
                    , float32Tag = "[object Float32Array]"
                    , float64Tag = "[object Float64Array]"
                    , int8Tag = "[object Int8Array]"
                    , int16Tag = "[object Int16Array]"
                    , int32Tag = "[object Int32Array]"
                    , uint8Tag = "[object Uint8Array]"
                    , uint8ClampedTag = "[object Uint8ClampedArray]"
                    , uint16Tag = "[object Uint16Array]"
                    , uint32Tag = "[object Uint32Array]"
                    , reRegExpChar = /[\\^$.*+?()[\]{}|]/g
                    , reIsHostCtor = /^\[object .+?Constructor\]$/
                    , reIsUint = /^(?:0|[1-9]\d*)$/
                    , typedArrayTags = {};
                typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0,
                    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
                var freeGlobal = "object" == ("undefined" == typeof global ? "undefined" : _typeof(global)) && global && global.Object === Object && global
                    , freeSelf = "object" == ("undefined" == typeof self ? "undefined" : _typeof(self)) && self && self.Object === Object && self
                    , root = freeGlobal || freeSelf || Function("return this")()
                    , freeExports = "object" == _typeof(exports) && exports && !exports.nodeType && exports
                    , freeModule = freeExports && "object" == _typeof(module) && module && !module.nodeType && module
                    , moduleExports = freeModule && freeModule.exports === freeExports
                    , freeProcess = moduleExports && freeGlobal.process
                    , nodeUtil = function() {
                    try {
                        return freeProcess && freeProcess.binding && freeProcess.binding("util")
                    } catch (e) {}
                }()
                    , nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray
                    , arrayProto = Array.prototype
                    , funcProto = Function.prototype
                    , objectProto = Object.prototype
                    , coreJsData = root["__core-js_shared__"]
                    , funcToString = funcProto.toString
                    , hasOwnProperty = objectProto.hasOwnProperty
                    , maskSrcKey = function() {
                    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                    return uid ? "Symbol(src)_1." + uid : ""
                }()
                    , nativeObjectToString = objectProto.toString
                    , reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                    , Buffer = moduleExports ? root.Buffer : void 0
                    , _Symbol = root.Symbol
                    , Uint8Array = root.Uint8Array
                    , propertyIsEnumerable = objectProto.propertyIsEnumerable
                    , splice = arrayProto.splice
                    , symToStringTag = _Symbol ? _Symbol.toStringTag : void 0
                    , nativeGetSymbols = Object.getOwnPropertySymbols
                    , nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0
                    , nativeKeys = overArg(Object.keys, Object)
                    , DataView = getNative(root, "DataView")
                    , Map = getNative(root, "Map")
                    , Promise = getNative(root, "Promise")
                    , Set = getNative(root, "Set")
                    , WeakMap = getNative(root, "WeakMap")
                    , nativeCreate = getNative(Object, "create")
                    , dataViewCtorString = toSource(DataView)
                    , mapCtorString = toSource(Map)
                    , promiseCtorString = toSource(Promise)
                    , setCtorString = toSource(Set)
                    , weakMapCtorString = toSource(WeakMap)
                    , symbolProto = _Symbol ? _Symbol.prototype : void 0
                    , symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
                Hash.prototype.clear = hashClear,
                    Hash.prototype.delete = hashDelete,
                    Hash.prototype.get = hashGet,
                    Hash.prototype.has = hashHas,
                    Hash.prototype.set = hashSet,
                    ListCache.prototype.clear = listCacheClear,
                    ListCache.prototype.delete = listCacheDelete,
                    ListCache.prototype.get = listCacheGet,
                    ListCache.prototype.has = listCacheHas,
                    ListCache.prototype.set = listCacheSet,
                    MapCache.prototype.clear = mapCacheClear,
                    MapCache.prototype.delete = mapCacheDelete,
                    MapCache.prototype.get = mapCacheGet,
                    MapCache.prototype.has = mapCacheHas,
                    MapCache.prototype.set = mapCacheSet,
                    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd,
                    SetCache.prototype.has = setCacheHas,
                    Stack.prototype.clear = stackClear,
                    Stack.prototype.delete = stackDelete,
                    Stack.prototype.get = stackGet,
                    Stack.prototype.has = stackHas,
                    Stack.prototype.set = stackSet;
                var getSymbols = nativeGetSymbols ? function(object) {
                        return null == object ? [] : (object = Object(object),
                            arrayFilter(nativeGetSymbols(object), function(symbol) {
                                return propertyIsEnumerable.call(object, symbol)
                            }))
                    }
                    : stubArray
                    , getTag = baseGetTag;
                (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) && (getTag = function(value) {
                        var result = baseGetTag(value)
                            , Ctor = result == objectTag ? value.constructor : void 0
                            , ctorString = Ctor ? toSource(Ctor) : "";
                        if (ctorString)
                            switch (ctorString) {
                                case dataViewCtorString:
                                    return dataViewTag;
                                case mapCtorString:
                                    return mapTag;
                                case promiseCtorString:
                                    return promiseTag;
                                case setCtorString:
                                    return setTag;
                                case weakMapCtorString:
                                    return weakMapTag
                            }
                        return result
                    }
                );
                var isArguments = baseIsArguments(function() {
                    return arguments
                }()) ? baseIsArguments : function(value) {
                    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee")
                }
                    , isArray = Array.isArray
                    , isBuffer = nativeIsBuffer || stubFalse
                    , isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
                module.exports = isEqual
            }
        ).call(exports, function() {
            return this
        }(), __webpack_require__(117)(module))
    }
    , function(module, exports) {
        "use strict";
        function Point(x, y) {
            this.x = x,
                this.y = y
        }
        module.exports = Point,
            Point.prototype = {
                clone: function() {
                    return new Point(this.x,this.y)
                },
                add: function(p) {
                    return this.clone()._add(p)
                },
                sub: function(p) {
                    return this.clone()._sub(p)
                },
                multByPoint: function(p) {
                    return this.clone()._multByPoint(p)
                },
                divByPoint: function(p) {
                    return this.clone()._divByPoint(p)
                },
                mult: function(k) {
                    return this.clone()._mult(k)
                },
                div: function(k) {
                    return this.clone()._div(k)
                },
                rotate: function(a) {
                    return this.clone()._rotate(a)
                },
                rotateAround: function(a, p) {
                    return this.clone()._rotateAround(a, p)
                },
                matMult: function(m) {
                    return this.clone()._matMult(m)
                },
                unit: function() {
                    return this.clone()._unit()
                },
                perp: function() {
                    return this.clone()._perp()
                },
                round: function() {
                    return this.clone()._round()
                },
                mag: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                equals: function(other) {
                    return this.x === other.x && this.y === other.y
                },
                dist: function(p) {
                    return Math.sqrt(this.distSqr(p))
                },
                distSqr: function(p) {
                    var dx = p.x - this.x
                        , dy = p.y - this.y;
                    return dx * dx + dy * dy
                },
                angle: function() {
                    return Math.atan2(this.y, this.x)
                },
                angleTo: function(b) {
                    return Math.atan2(this.y - b.y, this.x - b.x)
                },
                angleWith: function(b) {
                    return this.angleWithSep(b.x, b.y)
                },
                angleWithSep: function(x, y) {
                    return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y)
                },
                _matMult: function(m) {
                    var x = m[0] * this.x + m[1] * this.y
                        , y = m[2] * this.x + m[3] * this.y;
                    return this.x = x,
                        this.y = y,
                        this
                },
                _add: function(p) {
                    return this.x += p.x,
                        this.y += p.y,
                        this
                },
                _sub: function(p) {
                    return this.x -= p.x,
                        this.y -= p.y,
                        this
                },
                _mult: function(k) {
                    return this.x *= k,
                        this.y *= k,
                        this
                },
                _div: function(k) {
                    return this.x /= k,
                        this.y /= k,
                        this
                },
                _multByPoint: function(p) {
                    return this.x *= p.x,
                        this.y *= p.y,
                        this
                },
                _divByPoint: function(p) {
                    return this.x /= p.x,
                        this.y /= p.y,
                        this
                },
                _unit: function() {
                    return this._div(this.mag()),
                        this
                },
                _perp: function() {
                    var y = this.y;
                    return this.y = this.x,
                        this.x = -y,
                        this
                },
                _rotate: function(angle) {
                    var cos = Math.cos(angle)
                        , sin = Math.sin(angle)
                        , x = cos * this.x - sin * this.y
                        , y = sin * this.x + cos * this.y;
                    return this.x = x,
                        this.y = y,
                        this
                },
                _rotateAround: function(angle, p) {
                    var cos = Math.cos(angle)
                        , sin = Math.sin(angle)
                        , x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y)
                        , y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
                    return this.x = x,
                        this.y = y,
                        this
                },
                _round: function() {
                    return this.x = Math.round(this.x),
                        this.y = Math.round(this.y),
                        this
                }
            },
            Point.convert = function(a) {
                return a instanceof Point ? a : Array.isArray(a) ? new Point(a[0],a[1]) : a
            }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var isEqual = __webpack_require__(226)
            , normalize = __webpack_require__(221)
            , hat = __webpack_require__(110)
            , featuresAt = __webpack_require__(60)
            , stringSetsAreEqual = __webpack_require__(238)
            , geojsonhint = __webpack_require__(222)
            , Constants = __webpack_require__(7)
            , StringSet = __webpack_require__(61)
            , featureTypes = {
            Polygon: __webpack_require__(81),
            LineString: __webpack_require__(79),
            Point: __webpack_require__(80),
            MultiPolygon: __webpack_require__(58),
            MultiLineString: __webpack_require__(58),
            MultiPoint: __webpack_require__(58)
        };
        module.exports = function(ctx, api) {
            return api.modes = Constants.modes,
                api.getFeatureIdsAt = function(point) {
                    var features = featuresAt.click({
                        point: point
                    }, null, ctx);
                    return features.map(function(feature) {
                        return feature.properties.id
                    })
                }
                ,
                api.getSelectedIds = function() {
                    return ctx.store.getSelectedIds()
                }
                ,
                api.getSelected = function() {
                    return {
                        type: Constants.geojsonTypes.FEATURE_COLLECTION,
                        features: ctx.store.getSelectedIds().map(function(id) {
                            return ctx.store.get(id)
                        }).map(function(feature) {
                            return feature.toGeoJSON()
                        })
                    }
                }
                ,
                api.getSelectedPoints = function() {
                    return {
                        type: Constants.geojsonTypes.FEATURE_COLLECTION,
                        features: ctx.store.getSelectedCoordinates().map(function(coordinate) {
                            return {
                                type: Constants.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: Constants.geojsonTypes.POINT,
                                    coordinates: coordinate.coordinates
                                }
                            }
                        })
                    }
                }
                ,
                api.set = function(featureCollection) {
                    if (void 0 === featureCollection.type || featureCollection.type !== Constants.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(featureCollection.features))
                        throw new Error("Invalid FeatureCollection");
                    var renderBatch = ctx.store.createRenderBatch()
                        , toDelete = ctx.store.getAllIds().slice()
                        , newIds = api.add(featureCollection)
                        , newIdsLookup = new StringSet(newIds);
                    return toDelete = toDelete.filter(function(id) {
                        return !newIdsLookup.has(id)
                    }),
                    toDelete.length && api.delete(toDelete),
                        renderBatch(),
                        newIds
                }
                ,
                api.add = function(geojson) {
                    var errors = geojsonhint.hint(geojson, {
                        precisionWarning: !1
                    }).filter(function(e) {
                        return "message" !== e.level
                    });
                    if (errors.length)
                        throw new Error(errors[0].message);
                    var featureCollection = JSON.parse(JSON.stringify(normalize(geojson)))
                        , ids = featureCollection.features.map(function(feature) {
                        if (feature.id = feature.id || hat(),
                        null === feature.geometry)
                            throw new Error("Invalid geometry: null");
                        if (void 0 === ctx.store.get(feature.id) || ctx.store.get(feature.id).type !== feature.geometry.type) {
                            var Model = featureTypes[feature.geometry.type];
                            if (void 0 === Model)
                                throw new Error("Invalid geometry type: " + feature.geometry.type + ".");
                            var internalFeature = new Model(ctx,feature);
                            ctx.store.add(internalFeature)
                        } else {
                            var _internalFeature = ctx.store.get(feature.id);
                            _internalFeature.properties = feature.properties,
                            isEqual(_internalFeature.getCoordinates(), feature.geometry.coordinates) || _internalFeature.incomingCoords(feature.geometry.coordinates)
                        }
                        return feature.id
                    });
                    return ctx.store.render(),
                        ids
                }
                ,
                api.get = function(id) {
                    var feature = ctx.store.get(id);
                    return feature ? feature.toGeoJSON() : void 0
                }
                ,
                api.getAll = function() {
                    return {
                        type: Constants.geojsonTypes.FEATURE_COLLECTION,
                        features: ctx.store.getAll().map(function(feature) {
                            return feature.toGeoJSON()
                        })
                    }
                }
                ,
                api.delete = function(featureIds) {
                    return ctx.store.delete(featureIds, {
                        silent: !0
                    }),
                        api.getMode() !== Constants.modes.DIRECT_SELECT || ctx.store.getSelectedIds().length ? ctx.store.render() : ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, void 0, {
                            silent: !0
                        }),
                        api
                }
                ,
                api.deleteAll = function() {
                    return ctx.store.delete(ctx.store.getAllIds(), {
                        silent: !0
                    }),
                        api.getMode() === Constants.modes.DIRECT_SELECT ? ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, void 0, {
                            silent: !0
                        }) : ctx.store.render(),
                        api
                }
                ,
                api.changeMode = function(mode) {
                    var modeOptions = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    return mode === Constants.modes.SIMPLE_SELECT && api.getMode() === Constants.modes.SIMPLE_SELECT ? stringSetsAreEqual(modeOptions.featureIds || [], ctx.store.getSelectedIds()) ? api : (ctx.store.setSelected(modeOptions.featureIds, {
                        silent: !0
                    }),
                        ctx.store.render(),
                        api) : mode === Constants.modes.DIRECT_SELECT && api.getMode() === Constants.modes.DIRECT_SELECT && modeOptions.featureId === ctx.store.getSelectedIds()[0] ? api : (ctx.events.changeMode(mode, modeOptions, {
                        silent: !0
                    }),
                        api)
                }
                ,
                api.getMode = function() {
                    return ctx.events.getMode()
                }
                ,
                api.trash = function() {
                    return ctx.events.trash({
                        silent: !0
                    }),
                        api
                }
                ,
                api.combineFeatures = function() {
                    return ctx.events.combineFeatures({
                        silent: !0
                    }),
                        api
                }
                ,
                api.uncombineFeatures = function() {
                    return ctx.events.uncombineFeatures({
                        silent: !0
                    }),
                        api
                }
                ,
                api.setFeatureProperty = function(featureId, property, value) {
                    return ctx.store.setFeatureProperty(featureId, property, value),
                        api
                }
                ,
                api
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value,
                obj
        }
        var _modes, setupModeHandler = __webpack_require__(235), getFeaturesAndSetCursor = __webpack_require__(231), featuresAt = __webpack_require__(60), isClick = __webpack_require__(232), isTap = __webpack_require__(233), Constants = __webpack_require__(7), modes = (_modes = {},
            _defineProperty(_modes, Constants.modes.SIMPLE_SELECT, __webpack_require__(246)),
            _defineProperty(_modes, Constants.modes.DIRECT_SELECT, __webpack_require__(242)),
            _defineProperty(_modes, Constants.modes.DRAW_POINT, __webpack_require__(244)),
            _defineProperty(_modes, Constants.modes.DRAW_LINE_STRING, __webpack_require__(243)),
            _defineProperty(_modes, Constants.modes.DRAW_POLYGON, __webpack_require__(245)),
            _defineProperty(_modes, Constants.modes.STATIC, __webpack_require__(247)),
            _modes);
        module.exports = function(ctx) {
            function changeMode(modename, nextModeOptions) {
                var eventOptions = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                currentMode.stop();
                var modebuilder = modes[modename];
                if (void 0 === modebuilder)
                    throw new Error(modename + " is not valid");
                _currentModeName = modename;
                var mode = modebuilder(ctx, nextModeOptions);
                currentMode = setupModeHandler(mode, ctx),
                eventOptions.silent || ctx.map.fire(Constants.events.MODE_CHANGE, {
                    mode: modename
                }),
                    ctx.store.setDirty(),
                    ctx.store.render()
            }
            function actionable(actions) {
                var changed = !1;
                Object.keys(actions).forEach(function(action) {
                    if (void 0 === actionState[action])
                        throw new Error("Invalid action type");
                    actionState[action] !== actions[action] && (changed = !0),
                        actionState[action] = actions[action]
                }),
                changed && ctx.map.fire(Constants.events.ACTIONABLE, {
                    actions: actionState
                })
            }
            var mouseDownInfo = {}
                , touchStartInfo = {}
                , events = {}
                , _currentModeName = Constants.modes.SIMPLE_SELECT
                , currentMode = setupModeHandler(modes.simple_select(ctx), ctx);
            events.drag = function(event, isDrag) {
                isDrag({
                    point: event.point,
                    time: (new Date).getTime()
                }) ? (ctx.ui.queueMapClasses({
                    mouse: Constants.cursors.DRAG
                }),
                    currentMode.drag(event)) : event.originalEvent.stopPropagation()
            }
                ,
                events.mousedrag = function(event) {
                    events.drag(event, function(endInfo) {
                        return !isClick(mouseDownInfo, endInfo)
                    })
                }
                ,
                events.touchdrag = function(event) {
                    events.drag(event, function(endInfo) {
                        return !isTap(touchStartInfo, endInfo)
                    })
                }
                ,
                events.mousemove = function(event) {
                    var button = void 0 !== event.originalEvent.buttons ? event.originalEvent.buttons : event.originalEvent.which;
                    if (1 === button)
                        return events.mousedrag(event);
                    var target = getFeaturesAndSetCursor(event, ctx);
                    event.featureTarget = target,
                        currentMode.mousemove(event)
                }
                ,
                events.mousedown = function(event) {
                    mouseDownInfo = {
                        time: (new Date).getTime(),
                        point: event.point
                    };
                    var target = getFeaturesAndSetCursor(event, ctx);
                    event.featureTarget = target,
                        currentMode.mousedown(event)
                }
                ,
                events.mouseup = function(event) {
                    var target = getFeaturesAndSetCursor(event, ctx);
                    event.featureTarget = target,
                        isClick(mouseDownInfo, {
                            point: event.point,
                            time: (new Date).getTime()
                        }) ? currentMode.click(event) : currentMode.mouseup(event)
                }
                ,
                events.mouseout = function(event) {
                    currentMode.mouseout(event)
                }
                ,
                events.touchstart = function(event) {
                    if (event.originalEvent.preventDefault(),
                        ctx.options.touchEnabled) {
                        touchStartInfo = {
                            time: (new Date).getTime(),
                            point: event.point
                        };
                        var target = featuresAt.touch(event, null, ctx)[0];
                        event.featureTarget = target,
                            currentMode.touchstart(event)
                    }
                }
                ,
                events.touchmove = function(event) {
                    return event.originalEvent.preventDefault(),
                        ctx.options.touchEnabled ? (currentMode.touchmove(event),
                            events.touchdrag(event)) : void 0
                }
                ,
                events.touchend = function(event) {
                    if (event.originalEvent.preventDefault(),
                        ctx.options.touchEnabled) {
                        var target = featuresAt.touch(event, null, ctx)[0];
                        event.featureTarget = target,
                            isTap(touchStartInfo, {
                                time: (new Date).getTime(),
                                point: event.point
                            }) ? currentMode.tap(event) : currentMode.touchend(event)
                    }
                }
            ;
            var isKeyModeValid = function(code) {
                return !(8 === code || 46 === code || code >= 48 && 57 >= code)
            };
            events.keydown = function(event) {
                8 !== event.keyCode && 46 !== event.keyCode || !ctx.options.controls.trash ? isKeyModeValid(event.keyCode) ? currentMode.keydown(event) : 49 === event.keyCode && ctx.options.controls.point ? changeMode(Constants.modes.DRAW_POINT) : 50 === event.keyCode && ctx.options.controls.line_string ? changeMode(Constants.modes.DRAW_LINE_STRING) : 51 === event.keyCode && ctx.options.controls.polygon && changeMode(Constants.modes.DRAW_POLYGON) : (event.preventDefault(),
                    currentMode.trash())
            }
                ,
                events.keyup = function(event) {
                    isKeyModeValid(event.keyCode) && currentMode.keyup(event)
                }
                ,
                events.zoomend = function() {
                    ctx.store.changeZoom()
                }
                ,
                events.data = function(event) {
                    "style" === event.dataType && !function() {
                        var setup = ctx.setup
                            , map = ctx.map
                            , options = ctx.options
                            , store = ctx.store
                            , hasLayers = options.styles.some(function(style) {
                            return map.getLayer(style.id)
                        });
                        hasLayers || (setup.addLayers(),
                            store.setDirty(),
                            store.render())
                    }()
                }
            ;
            var actionState = {
                trash: !1,
                combineFeatures: !1,
                uncombineFeatures: !1
            }
                , api = {
                changeMode: changeMode,
                actionable: actionable,
                currentModeName: function() {
                    return _currentModeName
                },
                currentModeRender: function(geojson, push) {
                    return currentMode.render(geojson, push)
                },
                fire: function(name, event) {
                    events[name] && events[name](event)
                },
                addEventListeners: function() {
                    ctx.map.on("mousemove", events.mousemove),
                        ctx.map.on("mousedown", events.mousedown),
                        ctx.map.on("mouseup", events.mouseup),
                        ctx.map.on("data", events.data),
                        ctx.map.on("touchmove", events.touchmove),
                        ctx.map.on("touchstart", events.touchstart),
                        ctx.map.on("touchend", events.touchend),
                        ctx.container.addEventListener("mouseout", events.mouseout),
                    ctx.options.keybindings && (ctx.container.addEventListener("keydown", events.keydown),
                        ctx.container.addEventListener("keyup", events.keyup))
                },
                removeEventListeners: function() {
                    ctx.map.off("mousemove", events.mousemove),
                        ctx.map.off("mousedown", events.mousedown),
                        ctx.map.off("mouseup", events.mouseup),
                        ctx.map.off("data", events.data),
                        ctx.map.off("touchmove", events.touchmove),
                        ctx.map.off("touchstart", events.touchstart),
                        ctx.map.off("touchend", events.touchend),
                        ctx.container.removeEventListener("mouseout", events.mouseout),
                    ctx.options.keybindings && (ctx.container.removeEventListener("keydown", events.keydown),
                        ctx.container.removeEventListener("keyup", events.keyup))
                },
                trash: function(options) {
                    currentMode.trash(options)
                },
                combineFeatures: function() {
                    currentMode.combineFeatures()
                },
                uncombineFeatures: function() {
                    currentMode.uncombineFeatures()
                },
                getMode: function() {
                    return _currentModeName
                }
            };
            return api
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Constants = __webpack_require__(7);
        module.exports = function(parent, startVertex, endVertex, map) {
            var startCoord = startVertex.geometry.coordinates
                , endCoord = endVertex.geometry.coordinates;
            if (startCoord[1] > Constants.LAT_RENDERED_MAX || startCoord[1] < Constants.LAT_RENDERED_MIN || endCoord[1] > Constants.LAT_RENDERED_MAX || endCoord[1] < Constants.LAT_RENDERED_MIN)
                return null;
            var ptA = map.project([startCoord[0], startCoord[1]])
                , ptB = map.project([endCoord[0], endCoord[1]])
                , mid = map.unproject([(ptA.x + ptB.x) / 2, (ptA.y + ptB.y) / 2]);
            return {
                type: Constants.geojsonTypes.FEATURE,
                properties: {
                    meta: Constants.meta.MIDPOINT,
                    parent: parent,
                    lng: mid.lng,
                    lat: mid.lat,
                    coord_path: endVertex.properties.coord_path
                },
                geometry: {
                    type: Constants.geojsonTypes.POINT,
                    coordinates: [mid.lng, mid.lat]
                }
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var featuresAt = __webpack_require__(60)
            , Constants = __webpack_require__(7);
        module.exports = function(event, ctx) {
            var features = featuresAt.click(event, null, ctx)
                , classes = {
                mouse: Constants.cursors.NONE
            };
            return features[0] && (classes.mouse = features[0].properties.active === Constants.activeStates.ACTIVE ? Constants.cursors.MOVE : Constants.cursors.POINTER,
                classes.feature = features[0].properties.meta),
            -1 !== ctx.events.currentModeName().indexOf("draw") && (classes.mouse = Constants.cursors.ADD),
                ctx.ui.queueMapClasses(classes),
                ctx.ui.updateMapClasses(),
                features[0]
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var euclideanDistance = __webpack_require__(125)
            , FINE_TOLERANCE = 4
            , GROSS_TOLERANCE = 12
            , INTERVAL = 500;
        module.exports = function(start, end) {
            var options = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2]
                , fineTolerance = null != options.fineTolerance ? options.fineTolerance : FINE_TOLERANCE
                , grossTolerance = null != options.grossTolerance ? options.grossTolerance : GROSS_TOLERANCE
                , interval = null != options.interval ? options.interval : INTERVAL;
            start.point = start.point || end.point,
                start.time = start.time || end.time;
            var moveDistance = euclideanDistance(start.point, end.point);
            return fineTolerance > moveDistance || grossTolerance > moveDistance && end.time - start.time < interval
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var euclideanDistance = __webpack_require__(125)
            , TOLERANCE = 25
            , INTERVAL = 250;
        module.exports = function(start, end) {
            var options = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2]
                , tolerance = null != options.tolerance ? options.tolerance : TOLERANCE
                , interval = null != options.interval ? options.interval : INTERVAL;
            start.point = start.point || end.point,
                start.time = start.time || end.time;
            var moveDistance = euclideanDistance(start.point, end.point);
            return tolerance > moveDistance && end.time - start.time < interval
        }
    }
    , function(module, exports) {
        "use strict";
        function mapEventToBoundingBox(mapEvent) {
            var buffer = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
            return [[mapEvent.point.x - buffer, mapEvent.point.y - buffer], [mapEvent.point.x + buffer, mapEvent.point.y + buffer]]
        }
        module.exports = mapEventToBoundingBox
    }
    , function(module, exports) {
        "use strict";
        var ModeHandler = function(mode, DrawContext) {
            var handlers = {
                drag: [],
                click: [],
                mousemove: [],
                mousedown: [],
                mouseup: [],
                mouseout: [],
                keydown: [],
                keyup: [],
                touchstart: [],
                touchmove: [],
                touchend: [],
                tap: []
            }
                , ctx = {
                on: function(event, selector, fn) {
                    if (void 0 === handlers[event])
                        throw new Error("Invalid event type: " + event);
                    handlers[event].push({
                        selector: selector,
                        fn: fn
                    })
                },
                render: function(id) {
                    DrawContext.store.featureChanged(id)
                }
            }
                , delegate = function(eventName, event) {
                for (var handles = handlers[eventName], iHandle = handles.length; iHandle--; ) {
                    var handle = handles[iHandle];
                    if (handle.selector(event)) {
                        handle.fn.call(ctx, event),
                            DrawContext.store.render(),
                            DrawContext.ui.updateMapClasses();
                        break
                    }
                }
            };
            return mode.start.call(ctx),
                {
                    render: mode.render,
                    stop: function() {
                        mode.stop && mode.stop()
                    },
                    trash: function() {
                        mode.trash && (mode.trash(),
                            DrawContext.store.render())
                    },
                    combineFeatures: function() {
                        mode.combineFeatures && mode.combineFeatures()
                    },
                    uncombineFeatures: function() {
                        mode.uncombineFeatures && mode.uncombineFeatures()
                    },
                    drag: function(event) {
                        delegate("drag", event)
                    },
                    click: function(event) {
                        delegate("click", event)
                    },
                    mousemove: function(event) {
                        delegate("mousemove", event)
                    },
                    mousedown: function(event) {
                        delegate("mousedown", event)
                    },
                    mouseup: function(event) {
                        delegate("mouseup", event)
                    },
                    mouseout: function(event) {
                        delegate("mouseout", event)
                    },
                    keydown: function(event) {
                        delegate("keydown", event)
                    },
                    keyup: function(event) {
                        delegate("keyup", event)
                    },
                    touchstart: function(event) {
                        delegate("touchstart", event)
                    },
                    touchmove: function(event) {
                        delegate("touchmove", event)
                    },
                    touchend: function(event) {
                        delegate("touchend", event)
                    },
                    tap: function(event) {
                        delegate("tap", event)
                    }
                }
        };
        module.exports = ModeHandler
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function mouseEventPoint(mouseEvent, container) {
            var rect = container.getBoundingClientRect();
            return new Point(mouseEvent.clientX - rect.left - (container.clientLeft || 0),mouseEvent.clientY - rect.top - (container.clientTop || 0))
        }
        var Point = __webpack_require__(227);
        module.exports = mouseEventPoint
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function comparator(a, b) {
            var score = FEATURE_SORT_RANKS[a.geometry.type] - FEATURE_SORT_RANKS[b.geometry.type];
            return 0 === score && a.geometry.type === Constants.geojsonTypes.POLYGON ? a.area - b.area : score
        }
        function sortFeatures(features) {
            return features.map(function(feature) {
                return feature.geometry.type === Constants.geojsonTypes.POLYGON && (feature.area = area.geometry({
                    type: Constants.geojsonTypes.FEATURE,
                    property: {},
                    geometry: feature.geometry
                })),
                    feature
            }).sort(comparator).map(function(feature) {
                return delete feature.area,
                    feature
            })
        }
        var area = __webpack_require__(264)
            , Constants = __webpack_require__(7)
            , FEATURE_SORT_RANKS = {
            Point: 0,
            LineString: 1,
            Polygon: 2
        };
        module.exports = sortFeatures
    }
    , function(module, exports) {
        "use strict";
        module.exports = function(a, b) {
            return a.length !== b.length ? !1 : JSON.stringify(a.map(function(id) {
                return id
            }).sort()) === JSON.stringify(b.map(function(id) {
                return id
            }).sort())
        }
    }
    , function(module, exports) {
        "use strict";
        module.exports = [{
            id: "gl-draw-polygon-fill-inactive",
            type: "fill",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            paint: {
                "fill-color": "#3bb2d0",
                "fill-outline-color": "#3bb2d0",
                "fill-opacity": .1
            }
        }, {
            id: "gl-draw-polygon-fill-active",
            type: "fill",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#fbb03b",
                "fill-outline-color": "#fbb03b",
                "fill-opacity": .1
            }
        }, {
            id: "gl-draw-polygon-midpoint",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            }
        }, {
            id: "gl-draw-polygon-stroke-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 2
            }
        }, {
            id: "gl-draw-polygon-stroke-active",
            type: "line",
            filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 2
            }
        }, {
            id: "gl-draw-line-inactive",
            type: "line",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#3bb2d0",
                "line-width": 2
            }
        }, {
            id: "gl-draw-line-active",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#fbb03b",
                "line-dasharray": [.2, 2],
                "line-width": 2
            }
        }, {
            id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fff"
            }
        }, {
            id: "gl-draw-polygon-and-line-vertex-inactive",
            type: "circle",
            filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b"
            }
        }, {
            id: "gl-draw-point-point-stroke-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 5,
                "circle-opacity": 1,
                "circle-color": "#fff"
            }
        }, {
            id: "gl-draw-point-inactive",
            type: "circle",
            filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
            paint: {
                "circle-radius": 3,
                "circle-color": "#3bb2d0"
            }
        }, {
            id: "gl-draw-point-stroke-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
            paint: {
                "circle-radius": 7,
                "circle-color": "#fff"
            }
        }, {
            id: "gl-draw-point-active",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#fbb03b"
            }
        }, {
            id: "gl-draw-polygon-fill-static",
            type: "fill",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            paint: {
                "fill-color": "#404040",
                "fill-outline-color": "#404040",
                "fill-opacity": .1
            }
        }, {
            id: "gl-draw-polygon-stroke-static",
            type: "line",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#404040",
                "line-width": 2
            }
        }, {
            id: "gl-draw-line-static",
            type: "line",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
            layout: {
                "line-cap": "round",
                "line-join": "round"
            },
            paint: {
                "line-color": "#404040",
                "line-width": 2
            }
        }, {
            id: "gl-draw-point-static",
            type: "circle",
            filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
            paint: {
                "circle-radius": 5,
                "circle-color": "#404040"
            }
        }]
    }
    , function(module, exports) {
        "use strict";
        function throttle(fn, time, context) {
            function later() {
                lock = !1,
                args && (wrapperFn.apply(context, args),
                    args = !1)
            }
            function wrapperFn() {
                lock ? args = arguments : (lock = !0,
                    fn.apply(context, arguments),
                    setTimeout(later, time))
            }
            var lock = void 0
                , args = void 0;
            return wrapperFn
        }
        module.exports = throttle
    }
    , function(module, exports) {
        "use strict";
        function toDenseArray(x) {
            return [].concat(x).filter(function(y) {
                return void 0 !== y
            })
        }
        module.exports = toDenseArray
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var _require = __webpack_require__(48)
            , noTarget = _require.noTarget
            , isOfMetaType = _require.isOfMetaType
            , isInactiveFeature = _require.isInactiveFeature
            , isShiftDown = _require.isShiftDown
            , createSupplementaryPoints = __webpack_require__(124)
            , constrainFeatureMovement = __webpack_require__(123)
            , doubleClickZoom = __webpack_require__(59)
            , Constants = __webpack_require__(7)
            , CommonSelectors = __webpack_require__(48)
            , moveFeatures = __webpack_require__(127)
            , isVertex = isOfMetaType(Constants.meta.VERTEX)
            , isMidpoint = isOfMetaType(Constants.meta.MIDPOINT);
        module.exports = function(ctx, opts) {
            function pathsToCoordinates(featureId, paths) {
                return paths.map(function(coord_path) {
                    return {
                        feature_id: featureId,
                        coord_path: coord_path
                    }
                })
            }
            var featureId = opts.featureId
                , feature = ctx.store.get(featureId);
            if (!feature)
                throw new Error("You must provide a featureId to enter direct_select mode");
            if (feature.type === Constants.geojsonTypes.POINT)
                throw new TypeError("direct_select mode doesn't handle point features");
            var dragMoveLocation = opts.startPos || null
                , dragMoving = !1
                , canDragMove = !1
                , selectedCoordPaths = opts.coordPath ? [opts.coordPath] : []
                , selectedCoordinates = pathsToCoordinates(featureId, selectedCoordPaths);
            ctx.store.setSelectedCoordinates(selectedCoordinates);
            var fireUpdate = function() {
                ctx.map.fire(Constants.events.UPDATE, {
                    action: Constants.updateActions.CHANGE_COORDINATES,
                    features: ctx.store.getSelected().map(function(f) {
                        return f.toGeoJSON()
                    })
                })
            }
                , fireActionable = function() {
                return ctx.events.actionable({
                    combineFeatures: !1,
                    uncombineFeatures: !1,
                    trash: selectedCoordPaths.length > 0
                })
            }
                , startDragging = function(e) {
                ctx.map.dragPan.disable(),
                    canDragMove = !0,
                    dragMoveLocation = e.lngLat
            }
                , stopDragging = function() {
                ctx.map.dragPan.enable(),
                    dragMoving = !1,
                    canDragMove = !1,
                    dragMoveLocation = null
            }
                , onVertex = function(e) {
                startDragging(e);
                var about = e.featureTarget.properties
                    , selectedIndex = selectedCoordPaths.indexOf(about.coord_path);
                isShiftDown(e) || -1 !== selectedIndex ? isShiftDown(e) && -1 === selectedIndex && selectedCoordPaths.push(about.coord_path) : selectedCoordPaths = [about.coord_path];
                var selectedCoordinates = pathsToCoordinates(featureId, selectedCoordPaths);
                ctx.store.setSelectedCoordinates(selectedCoordinates),
                    feature.changed()
            }
                , onMidpoint = function(e) {
                startDragging(e);
                var about = e.featureTarget.properties;
                feature.addCoordinate(about.coord_path, about.lng, about.lat),
                    fireUpdate(),
                    selectedCoordPaths = [about.coord_path]
            }
                , onFeature = function(e) {
                0 === selectedCoordPaths.length ? startDragging(e) : stopDragging()
            }
                , dragFeature = function(e, delta) {
                moveFeatures(ctx.store.getSelected(), delta),
                    dragMoveLocation = e.lngLat
            }
                , dragVertex = function(e, delta) {
                for (var selectedCoords = selectedCoordPaths.map(function(coord_path) {
                    return feature.getCoordinate(coord_path)
                }), selectedCoordPoints = selectedCoords.map(function(coords) {
                    return {
                        type: Constants.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            type: Constants.geojsonTypes.POINT,
                            coordinates: coords
                        }
                    }
                }), constrainedDelta = constrainFeatureMovement(selectedCoordPoints, delta), i = 0; i < selectedCoords.length; i++) {
                    var coord = selectedCoords[i];
                    feature.updateCoordinate(selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat)
                }
            };
            return {
                start: function() {
                    function clickNoTarget() {
                        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                    }
                    function clickInactive() {
                        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                    }
                    function clickActiveFeature() {
                        selectedCoordPaths = [],
                            ctx.store.clearSelectedCoordinates(),
                            feature.changed()
                    }
                    ctx.store.setSelected(featureId),
                        doubleClickZoom.disable(ctx),
                        this.on("mousemove", CommonSelectors.true, function(e) {
                            var isFeature = CommonSelectors.isActiveFeature(e)
                                , onVertex = isVertex(e)
                                , noCoords = 0 === selectedCoordPaths.length;
                            isFeature && noCoords ? ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.MOVE
                            }) : onVertex && !noCoords ? ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.MOVE
                            }) : ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.NONE
                            }),
                                stopDragging(e)
                        }),
                        this.on("mouseout", function() {
                            return dragMoving
                        }, fireUpdate),
                        this.on("mousedown", isVertex, onVertex),
                        this.on("touchstart", isVertex, onVertex),
                        this.on("mousedown", CommonSelectors.isActiveFeature, onFeature),
                        this.on("touchstart", CommonSelectors.isActiveFeature, onFeature),
                        this.on("mousedown", isMidpoint, onMidpoint),
                        this.on("touchstart", isMidpoint, onMidpoint),
                        this.on("drag", function() {
                            return canDragMove
                        }, function(e) {
                            dragMoving = !0,
                                e.originalEvent.stopPropagation();
                            var delta = {
                                lng: e.lngLat.lng - dragMoveLocation.lng,
                                lat: e.lngLat.lat - dragMoveLocation.lat
                            };
                            selectedCoordPaths.length > 0 ? dragVertex(e, delta) : dragFeature(e, delta),
                                dragMoveLocation = e.lngLat
                        }),
                        this.on("click", CommonSelectors.true, stopDragging),
                        this.on("mouseup", CommonSelectors.true, function() {
                            dragMoving && fireUpdate(),
                                stopDragging()
                        }),
                        this.on("touchend", CommonSelectors.true, function() {
                            dragMoving && fireUpdate(),
                                stopDragging()
                        }),
                        this.on("click", noTarget, clickNoTarget),
                        this.on("tap", noTarget, clickNoTarget),
                        this.on("click", isInactiveFeature, clickInactive),
                        this.on("tap", isInactiveFeature, clickInactive),
                        this.on("click", CommonSelectors.isActiveFeature, clickActiveFeature),
                        this.on("tap", CommonSelectors.isActiveFeature, clickActiveFeature)
                },
                stop: function() {
                    doubleClickZoom.enable(ctx),
                        ctx.store.clearSelectedCoordinates()
                },
                render: function(geojson, push) {
                    featureId === geojson.properties.id ? (geojson.properties.active = Constants.activeStates.ACTIVE,
                        push(geojson),
                        createSupplementaryPoints(geojson, {
                            map: ctx.map,
                            midpoints: !0,
                            selectedPaths: selectedCoordPaths
                        }).forEach(push)) : (geojson.properties.active = Constants.activeStates.INACTIVE,
                        push(geojson)),
                        fireActionable()
                },
                trash: function() {
                    selectedCoordPaths.sort().reverse().forEach(function(id) {
                        return feature.removeCoordinate(id)
                    }),
                        ctx.map.fire(Constants.events.UPDATE, {
                            action: Constants.updateActions.CHANGE_COORDINATES,
                            features: ctx.store.getSelected().map(function(f) {
                                return f.toGeoJSON()
                            })
                        }),
                        selectedCoordPaths = [],
                        ctx.store.clearSelectedCoordinates(),
                        fireActionable(),
                    feature.isValid() === !1 && (ctx.store.delete([featureId]),
                        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}))
                }
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
                    arr2[i] = arr[i];
                return arr2
            }
            return Array.from(arr)
        }
        var CommonSelectors = __webpack_require__(48)
            , LineString = __webpack_require__(79)
            , isEventAtCoordinates = __webpack_require__(126)
            , doubleClickZoom = __webpack_require__(59)
            , Constants = __webpack_require__(7)
            , createVertex = __webpack_require__(82);
        module.exports = function(ctx, opts) {
            opts = opts || {};
            var featureId = opts.featureId
                , line = void 0
                , currentVertexPosition = void 0
                , direction = "forward";
            if (featureId) {
                if (line = ctx.store.get(featureId),
                    !line)
                    throw new Error("Could not find a feature with the provided featureId");
                var from = opts.from;
                if (from && "Feature" === from.type && from.geometry && "Point" === from.geometry.type && (from = from.geometry),
                from && "Point" === from.type && from.coordinates && 2 === from.coordinates.length && (from = from.coordinates),
                !from || !Array.isArray(from))
                    throw new Error("Please use the `from` property to indicate which point to continue the line from");
                var lastCoord = line.coordinates.length - 1;
                if (line.coordinates[lastCoord][0] === from[0] && line.coordinates[lastCoord][1] === from[1]) {
                    var _line;
                    currentVertexPosition = lastCoord + 1,
                        (_line = line).addCoordinate.apply(_line, [currentVertexPosition].concat(_toConsumableArray(line.coordinates[lastCoord])))
                } else {
                    if (line.coordinates[0][0] !== from[0] || line.coordinates[0][1] !== from[1])
                        throw new Error("`from` should match the point at either the start or the end of the provided LineString");
                    var _line2;
                    direction = "backwards",
                        currentVertexPosition = 0,
                        (_line2 = line).addCoordinate.apply(_line2, [currentVertexPosition].concat(_toConsumableArray(line.coordinates[0])))
                }
            } else
                line = new LineString(ctx,{
                    type: Constants.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: Constants.geojsonTypes.LINE_STRING,
                        coordinates: []
                    }
                }),
                    currentVertexPosition = 0,
                    ctx.store.add(line);
            return ctx._test && (ctx._test.line = line),
                {
                    start: function() {
                        function clickAnywhere(e) {
                            return currentVertexPosition > 0 && isEventAtCoordinates(e, line.coordinates[currentVertexPosition - 1]) || "backwards" === direction && isEventAtCoordinates(e, line.coordinates[currentVertexPosition + 1]) ? ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                featureIds: [line.id]
                            }) : (ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.ADD
                            }),
                                line.updateCoordinate(currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                                void ("forward" === direction ? currentVertexPosition++ : line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat)))
                        }
                        function clickOnVertex() {
                            return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                featureIds: [line.id]
                            })
                        }
                        ctx.store.clearSelected(),
                            doubleClickZoom.disable(ctx),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.ADD
                            }),
                            ctx.ui.setActiveButton(Constants.types.LINE),
                            this.on("mousemove", CommonSelectors.true, function(e) {
                                line.updateCoordinate(currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                                CommonSelectors.isVertex(e) && ctx.ui.queueMapClasses({
                                    mouse: Constants.cursors.POINTER
                                })
                            }),
                            this.on("click", CommonSelectors.true, clickAnywhere),
                            this.on("tap", CommonSelectors.true, clickAnywhere),
                            this.on("click", CommonSelectors.isVertex, clickOnVertex),
                            this.on("tap", CommonSelectors.isVertex, clickOnVertex),
                            this.on("keyup", CommonSelectors.isEscapeKey, function() {
                                ctx.store.delete([line.id], {
                                    silent: !0
                                }),
                                    ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                            }),
                            this.on("keyup", CommonSelectors.isEnterKey, function() {
                                ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                    featureIds: [line.id]
                                })
                            }),
                            ctx.events.actionable({
                                combineFeatures: !1,
                                uncombineFeatures: !1,
                                trash: !0
                            })
                    },
                    stop: function() {
                        doubleClickZoom.enable(ctx),
                            ctx.ui.setActiveButton(),
                        void 0 !== ctx.store.get(line.id) && (line.removeCoordinate("" + currentVertexPosition),
                            line.isValid() ? ctx.map.fire(Constants.events.CREATE, {
                                features: [line.toGeoJSON()]
                            }) : (ctx.store.delete([line.id], {
                                silent: !0
                            }),
                                ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, {
                                    silent: !0
                                })))
                    },
                    render: function(geojson, callback) {
                        var isActiveLine = geojson.properties.id === line.id;
                        return geojson.properties.active = isActiveLine ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE,
                            isActiveLine ? void (geojson.geometry.coordinates.length < 2 || (geojson.properties.meta = Constants.meta.FEATURE,
                            geojson.geometry.coordinates.length >= 3 && callback(createVertex(line.id, geojson.geometry.coordinates["forward" === direction ? geojson.geometry.coordinates.length - 2 : 1], "" + ("forward" === direction ? geojson.geometry.coordinates.length - 2 : 1), !1)),
                                callback(geojson))) : callback(geojson)
                    },
                    trash: function() {
                        ctx.store.delete([line.id], {
                            silent: !0
                        }),
                            ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                    }
                }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var CommonSelectors = __webpack_require__(48)
            , Point = __webpack_require__(80)
            , Constants = __webpack_require__(7);
        module.exports = function(ctx) {
            function stopDrawingAndRemove() {
                ctx.events.changeMode(Constants.modes.SIMPLE_SELECT),
                    ctx.store.delete([point.id], {
                        silent: !0
                    })
            }
            function handleClick(e) {
                ctx.ui.queueMapClasses({
                    mouse: Constants.cursors.MOVE
                }),
                    point.updateCoordinate("", e.lngLat.lng, e.lngLat.lat),
                    ctx.map.fire(Constants.events.CREATE, {
                        features: [point.toGeoJSON()]
                    }),
                    ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                        featureIds: [point.id]
                    })
            }
            var point = new Point(ctx,{
                type: Constants.geojsonTypes.FEATURE,
                properties: {},
                geometry: {
                    type: Constants.geojsonTypes.POINT,
                    coordinates: []
                }
            });
            return ctx._test && (ctx._test.point = point),
                ctx.store.add(point),
                {
                    start: function() {
                        ctx.store.clearSelected(),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.ADD
                            }),
                            ctx.ui.setActiveButton(Constants.types.POINT),
                            this.on("click", CommonSelectors.true, handleClick),
                            this.on("tap", CommonSelectors.true, handleClick),
                            this.on("keyup", CommonSelectors.isEscapeKey, stopDrawingAndRemove),
                            this.on("keyup", CommonSelectors.isEnterKey, stopDrawingAndRemove),
                            ctx.events.actionable({
                                combineFeatures: !1,
                                uncombineFeatures: !1,
                                trash: !0
                            })
                    },
                    stop: function() {
                        ctx.ui.setActiveButton(),
                        point.getCoordinate().length || ctx.store.delete([point.id], {
                            silent: !0
                        })
                    },
                    render: function(geojson, callback) {
                        var isActivePoint = geojson.properties.id === point.id;
                        return geojson.properties.active = isActivePoint ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE,
                            isActivePoint ? void 0 : callback(geojson)
                    },
                    trash: function() {
                        stopDrawingAndRemove()
                    }
                }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var CommonSelectors = __webpack_require__(48)
            , Polygon = __webpack_require__(81)
            , doubleClickZoom = __webpack_require__(59)
            , Constants = __webpack_require__(7)
            , isEventAtCoordinates = __webpack_require__(126)
            , createVertex = __webpack_require__(82);
        module.exports = function(ctx) {
            var polygon = new Polygon(ctx,{
                type: Constants.geojsonTypes.FEATURE,
                properties: {},
                geometry: {
                    type: Constants.geojsonTypes.POLYGON,
                    coordinates: [[]]
                }
            })
                , currentVertexPosition = 0;
            return ctx._test && (ctx._test.polygon = polygon),
                ctx.store.add(polygon),
                {
                    start: function() {
                        function clickAnywhere(e) {
                            return currentVertexPosition > 0 && isEventAtCoordinates(e, polygon.coordinates[0][currentVertexPosition - 1]) ? ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                featureIds: [polygon.id]
                            }) : (ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.ADD
                            }),
                                polygon.updateCoordinate("0." + currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                                void currentVertexPosition++)
                        }
                        function clickOnVertex() {
                            return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                featureIds: [polygon.id]
                            })
                        }
                        ctx.store.clearSelected(),
                            doubleClickZoom.disable(ctx),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.ADD
                            }),
                            ctx.ui.setActiveButton(Constants.types.POLYGON),
                            this.on("mousemove", CommonSelectors.true, function(e) {
                                polygon.updateCoordinate("0." + currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                                CommonSelectors.isVertex(e) && ctx.ui.queueMapClasses({
                                    mouse: Constants.cursors.POINTER
                                })
                            }),
                            this.on("click", CommonSelectors.true, clickAnywhere),
                            this.on("click", CommonSelectors.isVertex, clickOnVertex),
                            this.on("tap", CommonSelectors.true, clickAnywhere),
                            this.on("tap", CommonSelectors.isVertex, clickOnVertex),
                            this.on("keyup", CommonSelectors.isEscapeKey, function() {
                                ctx.store.delete([polygon.id], {
                                    silent: !0
                                }),
                                    ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                            }),
                            this.on("keyup", CommonSelectors.isEnterKey, function() {
                                ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {
                                    featureIds: [polygon.id]
                                })
                            }),
                            ctx.events.actionable({
                                combineFeatures: !1,
                                uncombineFeatures: !1,
                                trash: !0
                            })
                    },
                    stop: function() {
                        ctx.ui.queueMapClasses({
                            mouse: Constants.cursors.NONE
                        }),
                            doubleClickZoom.enable(ctx),
                            ctx.ui.setActiveButton(),
                        void 0 !== ctx.store.get(polygon.id) && (polygon.removeCoordinate("0." + currentVertexPosition),
                            polygon.isValid() ? ctx.map.fire(Constants.events.CREATE, {
                                features: [polygon.toGeoJSON()]
                            }) : (ctx.store.delete([polygon.id], {
                                silent: !0
                            }),
                                ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, {
                                    silent: !0
                                })))
                    },
                    render: function(geojson, callback) {
                        var isActivePolygon = geojson.properties.id === polygon.id;
                        if (geojson.properties.active = isActivePolygon ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE,
                            !isActivePolygon)
                            return callback(geojson);
                        if (0 !== geojson.geometry.coordinates.length) {
                            var coordinateCount = geojson.geometry.coordinates[0].length;
                            if (!(3 > coordinateCount)) {
                                if (geojson.properties.meta = Constants.meta.FEATURE,
                                coordinateCount > 4) {
                                    callback(createVertex(polygon.id, geojson.geometry.coordinates[0][0], "0.0", !1));
                                    var endPos = geojson.geometry.coordinates[0].length - 3;
                                    callback(createVertex(polygon.id, geojson.geometry.coordinates[0][endPos], "0." + endPos, !1))
                                }
                                if (coordinateCount > 3)
                                    return callback(geojson);
                                var lineCoordinates = [[geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]];
                                return callback({
                                    type: Constants.geojsonTypes.FEATURE,
                                    properties: geojson.properties,
                                    geometry: {
                                        coordinates: lineCoordinates,
                                        type: Constants.geojsonTypes.LINE_STRING
                                    }
                                })
                            }
                        }
                    },
                    trash: function() {
                        ctx.store.delete([polygon.id], {
                            silent: !0
                        }),
                            ctx.events.changeMode(Constants.modes.SIMPLE_SELECT)
                    }
                }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var CommonSelectors = __webpack_require__(48)
            , mouseEventPoint = __webpack_require__(236)
            , featuresAt = __webpack_require__(60)
            , createSupplementaryPoints = __webpack_require__(124)
            , StringSet = __webpack_require__(61)
            , doubleClickZoom = __webpack_require__(59)
            , moveFeatures = __webpack_require__(127)
            , Constants = __webpack_require__(7)
            , MultiFeature = __webpack_require__(58);
        module.exports = function(ctx) {
            var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                , dragMoveLocation = null
                , boxSelectStartLocation = null
                , boxSelectElement = void 0
                , boxSelecting = !1
                , canBoxSelect = !1
                , dragMoving = !1
                , canDragMove = !1
                , initiallySelectedFeatureIds = options.featureIds || []
                , fireUpdate = function() {
                ctx.map.fire(Constants.events.UPDATE, {
                    action: Constants.updateActions.MOVE,
                    features: ctx.store.getSelected().map(function(f) {
                        return f.toGeoJSON()
                    })
                })
            }
                , fireActionable = function() {
                var selectedFeatures = ctx.store.getSelected()
                    , multiFeatures = selectedFeatures.filter(function(feature) {
                    return feature instanceof MultiFeature
                })
                    , combineFeatures = !1;
                selectedFeatures.length > 1 && !function() {
                    combineFeatures = !0;
                    var featureType = selectedFeatures[0].type.replace("Multi", "");
                    selectedFeatures.forEach(function(feature) {
                        feature.type.replace("Multi", "") !== featureType && (combineFeatures = !1)
                    })
                }();
                var uncombineFeatures = multiFeatures.length > 0
                    , trash = selectedFeatures.length > 0;
                ctx.events.actionable({
                    combineFeatures: combineFeatures,
                    uncombineFeatures: uncombineFeatures,
                    trash: trash
                })
            }
                , getUniqueIds = function(allFeatures) {
                if (!allFeatures.length)
                    return [];
                var ids = allFeatures.map(function(s) {
                    return s.properties.id
                }).filter(function(id) {
                    return void 0 !== id
                }).reduce(function(memo, id) {
                    return memo.add(id),
                        memo
                }, new StringSet);
                return ids.values()
            }
                , stopExtendedInteractions = function() {
                boxSelectElement && (boxSelectElement.parentNode && boxSelectElement.parentNode.removeChild(boxSelectElement),
                    boxSelectElement = null),
                    ctx.map.dragPan.enable(),
                    boxSelecting = !1,
                    canBoxSelect = !1,
                    dragMoving = !1,
                    canDragMove = !1
            };
            return {
                stop: function() {
                    doubleClickZoom.enable(ctx)
                },
                start: function() {
                    function clickAnywhere() {
                        var _this = this
                            , wasSelected = ctx.store.getSelectedIds();
                        wasSelected.length && (ctx.store.clearSelected(),
                            wasSelected.forEach(function(id) {
                                return _this.render(id)
                            })),
                            doubleClickZoom.enable(ctx),
                            stopExtendedInteractions()
                    }
                    function clickOnVertex(e) {
                        ctx.events.changeMode(Constants.modes.DIRECT_SELECT, {
                            featureId: e.featureTarget.properties.parent,
                            coordPath: e.featureTarget.properties.coord_path,
                            startPos: e.lngLat
                        }),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.MOVE
                            })
                    }
                    function startOnActiveFeature(e) {
                        stopExtendedInteractions(),
                            ctx.map.dragPan.disable(),
                            this.render(e.featureTarget.properties.id),
                            canDragMove = !0,
                            dragMoveLocation = e.lngLat
                    }
                    function clickOnFeature(e) {
                        doubleClickZoom.disable(ctx),
                            stopExtendedInteractions();
                        var isShiftClick = CommonSelectors.isShiftDown(e)
                            , selectedFeatureIds = ctx.store.getSelectedIds()
                            , featureId = e.featureTarget.properties.id
                            , isFeatureSelected = ctx.store.isSelected(featureId);
                        return !isShiftClick && isFeatureSelected && ctx.store.get(featureId).type !== Constants.geojsonTypes.POINT ? ctx.events.changeMode(Constants.modes.DIRECT_SELECT, {
                            featureId: featureId
                        }) : (isFeatureSelected && isShiftClick ? (ctx.store.deselect(featureId),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.POINTER
                            }),
                        1 === selectedFeatureIds.length && doubleClickZoom.enable(ctx)) : !isFeatureSelected && isShiftClick ? (ctx.store.select(featureId),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.MOVE
                            })) : isFeatureSelected || isShiftClick || (selectedFeatureIds.forEach(this.render),
                            ctx.store.setSelected(featureId),
                            ctx.ui.queueMapClasses({
                                mouse: Constants.cursors.MOVE
                            })),
                            void this.render(featureId))
                    }
                    ctx.store && (ctx.store.setSelected(initiallySelectedFeatureIds.filter(function(id) {
                        return void 0 !== ctx.store.get(id)
                    })),
                        fireActionable()),
                        this.on("mouseup", CommonSelectors.true, stopExtendedInteractions),
                        this.on("mousemove", CommonSelectors.true, stopExtendedInteractions),
                        this.on("mouseout", function() {
                            return dragMoving
                        }, fireUpdate),
                        this.on("click", CommonSelectors.noTarget, clickAnywhere),
                        this.on("tap", CommonSelectors.noTarget, clickAnywhere),
                        this.on("click", CommonSelectors.isOfMetaType(Constants.meta.VERTEX), clickOnVertex),
                        this.on("tap", CommonSelectors.isOfMetaType(Constants.meta.VERTEX), clickOnVertex),
                        this.on("mousedown", CommonSelectors.isActiveFeature, startOnActiveFeature),
                        this.on("touchstart", CommonSelectors.isActiveFeature, startOnActiveFeature),
                        this.on("click", CommonSelectors.isFeature, clickOnFeature),
                        this.on("tap", CommonSelectors.isFeature, clickOnFeature),
                        this.on("drag", function() {
                            return canDragMove
                        }, function(e) {
                            dragMoving = !0,
                                e.originalEvent.stopPropagation();
                            var delta = {
                                lng: e.lngLat.lng - dragMoveLocation.lng,
                                lat: e.lngLat.lat - dragMoveLocation.lat
                            };
                            moveFeatures(ctx.store.getSelected(), delta),
                                dragMoveLocation = e.lngLat
                        }),
                        this.on("mouseup", CommonSelectors.true, function(e) {
                            if (dragMoving)
                                fireUpdate();
                            else if (boxSelecting) {
                                var bbox = [boxSelectStartLocation, mouseEventPoint(e.originalEvent, ctx.container)]
                                    , featuresInBox = featuresAt.click(null, bbox, ctx)
                                    , idsToSelect = getUniqueIds(featuresInBox).filter(function(id) {
                                    return !ctx.store.isSelected(id)
                                });
                                idsToSelect.length && (ctx.store.select(idsToSelect),
                                    idsToSelect.forEach(this.render),
                                    ctx.ui.queueMapClasses({
                                        mouse: Constants.cursors.MOVE
                                    }))
                            }
                            stopExtendedInteractions()
                        }),
                    ctx.options.boxSelect && (this.on("mousedown", CommonSelectors.isShiftMousedown, function(e) {
                        stopExtendedInteractions(),
                            ctx.map.dragPan.disable(),
                            boxSelectStartLocation = mouseEventPoint(e.originalEvent, ctx.container),
                            canBoxSelect = !0
                    }),
                        this.on("drag", function() {
                            return canBoxSelect
                        }, function(e) {
                            boxSelecting = !0,
                                ctx.ui.queueMapClasses({
                                    mouse: Constants.cursors.ADD
                                }),
                            boxSelectElement || (boxSelectElement = document.createElement("div"),
                                boxSelectElement.classList.add(Constants.classes.BOX_SELECT),
                                ctx.container.appendChild(boxSelectElement));
                            var current = mouseEventPoint(e.originalEvent, ctx.container)
                                , minX = Math.min(boxSelectStartLocation.x, current.x)
                                , maxX = Math.max(boxSelectStartLocation.x, current.x)
                                , minY = Math.min(boxSelectStartLocation.y, current.y)
                                , maxY = Math.max(boxSelectStartLocation.y, current.y)
                                , translateValue = "translate(" + minX + "px, " + minY + "px)";
                            boxSelectElement.style.transform = translateValue,
                                boxSelectElement.style.WebkitTransform = translateValue,
                                boxSelectElement.style.width = maxX - minX + "px",
                                boxSelectElement.style.height = maxY - minY + "px"
                        }))
                },
                render: function(geojson, push) {
                    geojson.properties.active = ctx.store.isSelected(geojson.properties.id) ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE,
                        push(geojson),
                        fireActionable(),
                    geojson.properties.active === Constants.activeStates.ACTIVE && geojson.geometry.type !== Constants.geojsonTypes.POINT && createSupplementaryPoints(geojson).forEach(push)
                },
                trash: function() {
                    ctx.store.delete(ctx.store.getSelectedIds()),
                        fireActionable()
                },
                combineFeatures: function() {
                    var selectedFeatures = ctx.store.getSelected();
                    if (!(0 === selectedFeatures.length || selectedFeatures.length < 2)) {
                        for (var coordinates = [], featuresCombined = [], featureType = selectedFeatures[0].type.replace("Multi", ""), i = 0; i < selectedFeatures.length; i++) {
                            var feature = selectedFeatures[i];
                            if (feature.type.replace("Multi", "") !== featureType)
                                return;
                            feature.type.includes("Multi") ? feature.getCoordinates().forEach(function(subcoords) {
                                coordinates.push(subcoords)
                            }) : coordinates.push(feature.getCoordinates()),
                                featuresCombined.push(feature.toGeoJSON())
                        }
                        if (featuresCombined.length > 1) {
                            var multiFeature = new MultiFeature(ctx,{
                                type: Constants.geojsonTypes.FEATURE,
                                properties: featuresCombined[0].properties,
                                geometry: {
                                    type: "Multi" + featureType,
                                    coordinates: coordinates
                                }
                            });
                            ctx.store.add(multiFeature),
                                ctx.store.delete(ctx.store.getSelectedIds(), {
                                    silent: !0
                                }),
                                ctx.store.setSelected([multiFeature.id]),
                                ctx.map.fire(Constants.events.COMBINE_FEATURES, {
                                    createdFeatures: [multiFeature.toGeoJSON()],
                                    deletedFeatures: featuresCombined
                                })
                        }
                        fireActionable()
                    }
                },
                uncombineFeatures: function() {
                    var selectedFeatures = ctx.store.getSelected();
                    if (0 !== selectedFeatures.length) {
                        for (var createdFeatures = [], featuresUncombined = [], _loop = function(i) {
                            var feature = selectedFeatures[i];
                            feature instanceof MultiFeature && (feature.getFeatures().forEach(function(subFeature) {
                                ctx.store.add(subFeature),
                                    subFeature.properties = feature.properties,
                                    createdFeatures.push(subFeature.toGeoJSON()),
                                    ctx.store.select([subFeature.id])
                            }),
                                ctx.store.delete(feature.id, {
                                    silent: !0
                                }),
                                featuresUncombined.push(feature.toGeoJSON()))
                        }, i = 0; i < selectedFeatures.length; i++)
                            _loop(i);
                        createdFeatures.length > 1 && ctx.map.fire(Constants.events.UNCOMBINE_FEATURES, {
                            createdFeatures: createdFeatures,
                            deletedFeatures: featuresUncombined
                        }),
                            fireActionable()
                    }
                }
            }
        }
    }
    , function(module, exports) {
        "use strict";
        module.exports = function(ctx) {
            return {
                stop: function() {},
                start: function() {
                    ctx.events.actionable({
                        combineFeatures: !1,
                        uncombineFeatures: !1,
                        trash: !1
                    })
                },
                render: function(geojson, push) {
                    push(geojson)
                }
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function addSources(styles, sourceBucket) {
            return styles.map(function(style) {
                return style.source ? style : xtend(style, {
                    id: style.id + "." + sourceBucket,
                    source: "hot" === sourceBucket ? Constants.sources.HOT : Constants.sources.COLD
                })
            })
        }
        var xtend = __webpack_require__(170)
            , Constants = __webpack_require__(7)
            , defaultOptions = {
            defaultMode: Constants.modes.SIMPLE_SELECT,
            keybindings: !0,
            touchEnabled: !0,
            clickBuffer: 2,
            touchBuffer: 25,
            boxSelect: !0,
            displayControlsDefault: !0,
            styles: __webpack_require__(239),
            controls: {},
            userProperties: !1
        }
            , showControls = {
            point: !0,
            line_string: !0,
            polygon: !0,
            trash: !0,
            combine_features: !0,
            uncombine_features: !0
        }
            , hideControls = {
            point: !1,
            line_string: !1,
            polygon: !1,
            trash: !1,
            combine_features: !1,
            uncombine_features: !1
        };
        module.exports = function() {
            var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
                , withDefaults = xtend(options);
            return options.controls || (withDefaults.controls = {}),
                options.displayControlsDefault === !1 ? withDefaults.controls = xtend(hideControls, options.controls) : withDefaults.controls = xtend(showControls, options.controls),
                withDefaults = xtend(defaultOptions, withDefaults),
                withDefaults.styles = addSources(withDefaults.styles, "cold").concat(addSources(withDefaults.styles, "hot")),
                withDefaults
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var Constants = __webpack_require__(7);
        module.exports = function() {
            function renderFeature(id, source) {
                var feature = store.get(id)
                    , featureInternal = feature.internal(mode);
                store.ctx.events.currentModeRender(featureInternal, function(geojson) {
                    store.sources[source].push(geojson)
                })
            }
            function cleanup() {
                store.isDirty = !1,
                    store.clearChangedIds()
            }
            var store = this
                , mapExists = store.ctx.map && void 0 !== store.ctx.map.getSource(Constants.sources.HOT);
            if (!mapExists)
                return cleanup();
            var mode = store.ctx.events.currentModeName();
            store.ctx.ui.queueMapClasses({
                mode: mode
            });
            var newHotIds = []
                , newColdIds = [];
            store.isDirty ? newColdIds = store.getAllIds() : (newHotIds = store.getChangedIds().filter(function(id) {
                return void 0 !== store.get(id)
            }),
                newColdIds = store.sources.hot.filter(function(geojson) {
                    return geojson.properties.id && -1 === newHotIds.indexOf(geojson.properties.id) && void 0 !== store.get(geojson.properties.id)
                }).map(function(geojson) {
                    return geojson.properties.id
                })),
                store.sources.hot = [];
            var lastColdCount = store.sources.cold.length;
            store.sources.cold = store.isDirty ? [] : store.sources.cold.filter(function(geojson) {
                var id = geojson.properties.id || geojson.properties.parent;
                return -1 === newHotIds.indexOf(id)
            });
            var coldChanged = lastColdCount !== store.sources.cold.length || newColdIds.length > 0;
            if (newHotIds.forEach(function(id) {
                return renderFeature(id, "hot")
            }),
                newColdIds.forEach(function(id) {
                    return renderFeature(id, "cold")
                }),
            coldChanged && store.ctx.map.getSource(Constants.sources.COLD).setData({
                type: Constants.geojsonTypes.FEATURE_COLLECTION,
                features: store.sources.cold
            }),
                store.ctx.map.getSource(Constants.sources.HOT).setData({
                    type: Constants.geojsonTypes.FEATURE_COLLECTION,
                    features: store.sources.hot
                }),
            store._emitSelectionChange && (store.ctx.map.fire(Constants.events.SELECTION_CHANGE, {
                features: store.getSelected().map(function(feature) {
                    return feature.toGeoJSON()
                }),
                points: store.getSelectedCoordinates().map(function(coordinate) {
                    return {
                        type: Constants.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            type: Constants.geojsonTypes.POINT,
                            coordinates: coordinate.coordinates
                        }
                    }
                })
            }),
                store._emitSelectionChange = !1),
                store._deletedFeaturesToEmit.length) {
                var geojsonToEmit = store._deletedFeaturesToEmit.map(function(feature) {
                    return feature.toGeoJSON()
                });
                store._deletedFeaturesToEmit = [],
                    store.ctx.map.fire(Constants.events.DELETE, {
                        features: geojsonToEmit
                    })
            }
            store.ctx.map.fire(Constants.events.RENDER, {}),
                cleanup()
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var events = __webpack_require__(229)
            , Store = __webpack_require__(251)
            , ui = __webpack_require__(252)
            , Constants = __webpack_require__(7);
        module.exports = function(ctx) {
            ctx.events = events(ctx),
                ctx.map = null,
                ctx.container = null,
                ctx.store = null,
                ctx.ui = ui(ctx);
            var controlContainer = null
                , setup = {
                onRemove: function() {
                    return setup.removeLayers(),
                        ctx.ui.removeButtons(),
                        ctx.events.removeEventListeners(),
                        ctx.map = null,
                        ctx.container = null,
                        ctx.store = null,
                    controlContainer && controlContainer.parentNode && controlContainer.parentNode.removeChild(controlContainer),
                        controlContainer = null,
                        this
                },
                onAdd: function(map) {
                    ctx.map = map,
                        ctx.container = map.getContainer(),
                        ctx.store = new Store(ctx),
                        controlContainer = ctx.ui.addButtons(),
                    ctx.options.boxSelect && (map.boxZoom.disable(),
                        map.dragPan.disable(),
                        map.dragPan.enable());
                    var intervalId = null
                        , connect = function connect() {
                        map.off("load", connect),
                            clearInterval(intervalId),
                            setup.addLayers(),
                            ctx.events.addEventListeners()
                    };
                    return map.loaded() ? connect() : (map.on("load", connect),
                        intervalId = setInterval(function() {
                            map.loaded() && connect()
                        }, 16)),
                        controlContainer
                },
                addLayers: function() {
                    ctx.map.addSource(Constants.sources.COLD, {
                        data: {
                            type: Constants.geojsonTypes.FEATURE_COLLECTION,
                            features: []
                        },
                        type: "geojson"
                    }),
                        ctx.map.addSource(Constants.sources.HOT, {
                            data: {
                                type: Constants.geojsonTypes.FEATURE_COLLECTION,
                                features: []
                            },
                            type: "geojson"
                        }),
                        ctx.options.styles.forEach(function(style) {
                            ctx.map.addLayer(style)
                        }),
                        ctx.store.render()
                },
                removeLayers: function() {
                    ctx.options.styles.forEach(function(style) {
                        ctx.map.removeLayer(style.id)
                    }),
                        ctx.map.removeSource(Constants.sources.COLD),
                        ctx.map.removeSource(Constants.sources.HOT)
                }
            };
            return ctx.setup = setup,
                setup
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        function refreshSelectedCoordinates(options) {
            var _this9 = this
                , newSelectedCoordinates = this._selectedCoordinates.filter(function(point) {
                return _this9._selectedFeatureIds.has(point.feature_id)
            });
            this._selectedCoordinates.length === newSelectedCoordinates.length || options.silent || (this._emitSelectionChange = !0),
                this._selectedCoordinates = newSelectedCoordinates
        }
        var throttle = __webpack_require__(240)
            , toDenseArray = __webpack_require__(241)
            , StringSet = __webpack_require__(61)
            , render = __webpack_require__(249)
            , Store = module.exports = function(ctx) {
                this._features = {},
                    this._featureIds = new StringSet,
                    this._selectedFeatureIds = new StringSet,
                    this._selectedCoordinates = [],
                    this._changedFeatureIds = new StringSet,
                    this._deletedFeaturesToEmit = [],
                    this._emitSelectionChange = !1,
                    this.ctx = ctx,
                    this.sources = {
                        hot: [],
                        cold: []
                    },
                    this.render = throttle(render, 16, this),
                    this.isDirty = !1
            }
        ;
        Store.prototype.createRenderBatch = function() {
            var _this = this
                , holdRender = this.render
                , numRenders = 0;
            return this.render = function() {
                numRenders++
            }
                ,
                function() {
                    _this.render = holdRender,
                    numRenders > 0 && _this.render()
                }
        }
            ,
            Store.prototype.setDirty = function() {
                return this.isDirty = !0,
                    this
            }
            ,
            Store.prototype.featureChanged = function(featureId) {
                return this._changedFeatureIds.add(featureId),
                    this
            }
            ,
            Store.prototype.getChangedIds = function() {
                return this._changedFeatureIds.values()
            }
            ,
            Store.prototype.clearChangedIds = function() {
                return this._changedFeatureIds.clear(),
                    this
            }
            ,
            Store.prototype.getAllIds = function() {
                return this._featureIds.values()
            }
            ,
            Store.prototype.add = function(feature) {
                return this.featureChanged(feature.id),
                    this._features[feature.id] = feature,
                    this._featureIds.add(feature.id),
                    this
            }
            ,
            Store.prototype.delete = function(featureIds) {
                var _this2 = this
                    , options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return toDenseArray(featureIds).forEach(function(id) {
                    _this2._featureIds.has(id) && (_this2._featureIds.delete(id),
                        _this2._selectedFeatureIds.delete(id),
                    options.silent || -1 === _this2._deletedFeaturesToEmit.indexOf(_this2._features[id]) && _this2._deletedFeaturesToEmit.push(_this2._features[id]),
                        delete _this2._features[id],
                        _this2.isDirty = !0)
                }),
                    refreshSelectedCoordinates.call(this, options),
                    this
            }
            ,
            Store.prototype.get = function(id) {
                return this._features[id]
            }
            ,
            Store.prototype.getAll = function() {
                var _this3 = this;
                return Object.keys(this._features).map(function(id) {
                    return _this3._features[id]
                })
            }
            ,
            Store.prototype.select = function(featureIds) {
                var _this4 = this
                    , options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return toDenseArray(featureIds).forEach(function(id) {
                    _this4._selectedFeatureIds.has(id) || (_this4._selectedFeatureIds.add(id),
                        _this4._changedFeatureIds.add(id),
                    options.silent || (_this4._emitSelectionChange = !0))
                }),
                    this
            }
            ,
            Store.prototype.deselect = function(featureIds) {
                var _this5 = this
                    , options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return toDenseArray(featureIds).forEach(function(id) {
                    _this5._selectedFeatureIds.has(id) && (_this5._selectedFeatureIds.delete(id),
                        _this5._changedFeatureIds.add(id),
                    options.silent || (_this5._emitSelectionChange = !0))
                }),
                    refreshSelectedCoordinates.call(this, options),
                    this
            }
            ,
            Store.prototype.clearSelected = function() {
                var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                return this.deselect(this._selectedFeatureIds.values(), {
                    silent: options.silent
                }),
                    this
            }
            ,
            Store.prototype.setSelected = function(featureIds) {
                var _this6 = this
                    , options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return featureIds = toDenseArray(featureIds),
                    this.deselect(this._selectedFeatureIds.values().filter(function(id) {
                        return -1 === featureIds.indexOf(id)
                    }), {
                        silent: options.silent
                    }),
                    this.select(featureIds.filter(function(id) {
                        return !_this6._selectedFeatureIds.has(id)
                    }), {
                        silent: options.silent
                    }),
                    this
            }
            ,
            Store.prototype.setSelectedCoordinates = function(coordinates) {
                return this._selectedCoordinates = coordinates,
                    this._emitSelectionChange = !0,
                    this
            }
            ,
            Store.prototype.clearSelectedCoordinates = function() {
                return this._selectedCoordinates = [],
                    this._emitSelectionChange = !0,
                    this
            }
            ,
            Store.prototype.getSelectedIds = function() {
                return this._selectedFeatureIds.values()
            }
            ,
            Store.prototype.getSelected = function() {
                var _this7 = this;
                return this._selectedFeatureIds.values().map(function(id) {
                    return _this7.get(id)
                })
            }
            ,
            Store.prototype.getSelectedCoordinates = function() {
                var _this8 = this
                    , selected = this._selectedCoordinates.map(function(coordinate) {
                    var feature = _this8.get(coordinate.feature_id);
                    return {
                        coordinates: feature.getCoordinate(coordinate.coord_path)
                    }
                });
                return selected
            }
            ,
            Store.prototype.isSelected = function(featureId) {
                return this._selectedFeatureIds.has(featureId)
            }
            ,
            Store.prototype.setFeatureProperty = function(featureId, property, value) {
                this.get(featureId).setProperty(property, value),
                    this.featureChanged(featureId)
            }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        var xtend = __webpack_require__(170)
            , Constants = __webpack_require__(7)
            , classTypes = ["mode", "feature", "mouse"];
        module.exports = function(ctx) {
            function queueMapClasses(options) {
                nextMapClasses = xtend(nextMapClasses, options)
            }
            function updateMapClasses() {
                if (ctx.container) {
                    var classesToRemove = []
                        , classesToAdd = [];
                    classTypes.forEach(function(type) {
                        nextMapClasses[type] !== currentMapClasses[type] && (classesToRemove.push(type + "-" + currentMapClasses[type]),
                        null !== nextMapClasses[type] && classesToAdd.push(type + "-" + nextMapClasses[type]))
                    }),
                    classesToRemove.length > 0 && ctx.container.classList.remove.apply(ctx.container.classList, classesToRemove),
                    classesToAdd.length > 0 && ctx.container.classList.add.apply(ctx.container.classList, classesToAdd),
                        currentMapClasses = xtend(currentMapClasses, nextMapClasses)
                }
            }
            function createControlButton(id) {
                var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                    , button = document.createElement("button");
                return button.className = Constants.classes.CONTROL_BUTTON + " " + options.className,
                    button.setAttribute("title", options.title),
                    options.container.appendChild(button),
                    button.addEventListener("click", function(e) {
                        e.preventDefault(),
                            e.stopPropagation();
                        var clickedButton = e.target;
                        return clickedButton === activeButton ? void deactivateButtons() : (setActiveButton(id),
                            void options.onActivate())
                    }, !0),
                    button
            }
            function deactivateButtons() {
                activeButton && (activeButton.classList.remove(Constants.classes.ACTIVE_BUTTON),
                    activeButton = null)
            }
            function setActiveButton(id) {
                deactivateButtons();
                var button = buttonElements[id];
                button && button && "trash" !== id && (button.classList.add(Constants.classes.ACTIVE_BUTTON),
                    activeButton = button)
            }
            function addButtons() {
                var controls = ctx.options.controls
                    , controlGroup = document.createElement("div");
                return controlGroup.className = Constants.classes.CONTROL_GROUP + " " + Constants.classes.CONTROL_BASE,
                    controls ? (controls[Constants.types.LINE] && (buttonElements[Constants.types.LINE] = createControlButton(Constants.types.LINE, {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_LINE,
                        title: "LineString tool " + (ctx.options.keybindings && "(l)"),
                        onActivate: function() {
                            return ctx.events.changeMode(Constants.modes.DRAW_LINE_STRING)
                        }
                    })),
                    controls[Constants.types.POLYGON] && (buttonElements[Constants.types.POLYGON] = createControlButton(Constants.types.POLYGON, {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_POLYGON,
                        title: "Polygon tool " + (ctx.options.keybindings && "(p)"),
                        onActivate: function() {
                            return ctx.events.changeMode(Constants.modes.DRAW_POLYGON)
                        }
                    })),
                    controls[Constants.types.POINT] && (buttonElements[Constants.types.POINT] = createControlButton(Constants.types.POINT, {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_POINT,
                        title: "Marker tool " + (ctx.options.keybindings && "(m)"),
                        onActivate: function() {
                            return ctx.events.changeMode(Constants.modes.DRAW_POINT)
                        }
                    })),
                    controls.trash && (buttonElements.trash = createControlButton("trash", {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_TRASH,
                        title: "Delete",
                        onActivate: function() {
                            ctx.events.trash()
                        }
                    })),
                    controls.combine_features && (buttonElements.combine_features = createControlButton("combineFeatures", {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
                        title: "Combine",
                        onActivate: function() {
                            ctx.events.combineFeatures()
                        }
                    })),
                    controls.uncombine_features && (buttonElements.uncombine_features = createControlButton("uncombineFeatures", {
                        container: controlGroup,
                        className: Constants.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                        title: "Uncombine",
                        onActivate: function() {
                            ctx.events.uncombineFeatures()
                        }
                    })),
                        controlGroup) : controlGroup
            }
            function removeButtons() {
                Object.keys(buttonElements).forEach(function(buttonId) {
                    var button = buttonElements[buttonId];
                    button.parentNode && button.parentNode.removeChild(button),
                        delete buttonElements[buttonId]
                })
            }
            var buttonElements = {}
                , activeButton = null
                , currentMapClasses = {
                mode: null,
                feature: null,
                mouse: null
            }
                , nextMapClasses = {
                mode: null,
                feature: null,
                mouse: null
            };
            return {
                setActiveButton: setActiveButton,
                queueMapClasses: queueMapClasses,
                updateMapClasses: updateMapClasses,
                addButtons: addButtons,
                removeButtons: removeButtons
            }
        }
    }
    , function(module, exports) {
        module.exports = '<md-sidenav class="site-sidenav md-sidenav-left md-whiteframe-z1"\n            md-component-id="left" hide-print\n            md-is-locked-open="$mdMedia(\'gt-sm\')" layout="column">\n\n\n\n  <div class="branding" ng-class="{\'is-dark\': $ctrl.isDarkTheme}" md-colors="{color: \'background-300\'}">\n    <h1 class="site-title md-headline" >Building Heights in England</h1>\n    <h2 class="byline md-subhead" >From <a href="http://www.emu-analytics.com" target="_blank">Emu Analytics</a></h2>\n  </div>\n\n  <geo-search polygons="$ctrl.polygons[0].polygons" on-location-selected="$ctrl.onGeoSearch(item, boundingBox)"></geo-search>\n\n  <md-content flex>\n    <polygon-list polygons="$ctrl.polygons"\n      on-item-click="$ctrl.onSelectPolygon(item)"\n      on-item-add="$ctrl.onAddPolygon(group, $event)"\n      on-item-edit="$ctrl.onEditPolygon(item, group)"\n      on-item-delete="$ctrl.onDeletePolygon(polygon, polygonGroup)"\n      ></polygon-list>\n  </md-content>\n\n  <div class="switch-container">\n  <md-switch ng-model="$ctrl.enable3D" ng-change="$ctrl.toggle3D()">\n    3D Buildings\n  </md-switch>\n  </div>\n\n</md-sidenav>\n\n<div class="main-container" role="main" flex>\n  <md-button ng-click="$ctrl.toggleSidebar()"\n             class="sidenav-button md-fab md-mini md-primary"\n             aria-label="Sidebar"\n             hide-gt-sm>\n    <md-icon md-font-set="fa" class="fa-bars"></md-icon>\n  </md-button>\n\n  <map-component id="main-map" on-load="$ctrl.mapLoaded()" params="$ctrl.mapParams"></map-component>\n</div>\n\n<md-sidenav class="info-sidenav md-sidenav-right md-whiteframe-z1"\n            md-component-id="right"\n            md-disable-backdrop="true"\n            md-is-open="$ctrl.isInfoNavOpen"\n            md-is-locked-open="false"\n            layout="column">\n\n  <md-button class="md-icon-button infonav-button"\n             aria-label="Toggle Info Bar"\n             ng-click="$ctrl.toggleInfoBar()"\n             analytics-on="click"\n             analytics-event="Close Info Bar">\n    <md-icon md-font-set="fa" class="fa-times-circle"></md-icon>\n  </md-button>\n\n\n  <md-content ng-switch="$ctrl.infoPanelContent()" flex>\n    <welcome-component ng-switch-when="welcome"></welcome-component>\n    <infographic class="fade-in" polygon="$ctrl.selectedPolygon" ng-switch-when="infographic" loading="$ctrl.AppState.ui.metricsLoading"></infographic>\n    <md-content layout-padding ng-switch-when="draw" class="help-text">\n      <h4><i class="fa fa-pencil"></i> Help: Area Drawing</h4>\n      <p>Draw your own area to view metrics such as building density and land area. Your area is automatically saved once you have finished drawing.</p>\n      <p><i class="fa fa-caret-right"></i> <b>Click</b> vertices to strech out a polygon around your area.</p>\n      <p><i class="fa fa-caret-right"></i> <b>Press RETURN</b> to finish drawing (or click on your starting vertex).</p>\n      <p><i class="fa fa-caret-right"></i> <b>Press ESC</b> to abandon drawing your area.</p>\n      <p>Note: you can pan and zoom the map while drawing.</p>\n     </md-content>\n    <md-content layout-padding ng-switch-when="edit" class="help-text">\n      <h4><i class="fa fa-pencil"></i> Help: Area Editing</h4>\n      <p>Edit your area by moving existing vertices or adding new vertices. Your area is automatically saved once you have finished editing.</p>\n      <p><i class="fa fa-caret-right"></i> <b>Drag</b> an existing vertex to move it.</p>\n      <p><i class="fa fa-caret-right"></i> <b>Click</b> on the midpoint of a line to create a new vertex.</p>\n      <p><i class="fa fa-caret-right"></i> <b>Click</b> outside of your area to finish editing.</p>\n    </md-content>\n  </md-content>\n\n  <a class="emu-banner" analytics-on="click" analytics-event="Banner Ad Click" href="http://www.emu-analytics.com/products/datapacks.php" target="_blank" flex="none"></a>\n\n</md-sidenav>\n'
    }
    , function(module, exports) {
        module.exports = '<div class="title" ng-bind-html="$ctrl.titleHTML"></div>\n<div class="number-container" flex layout="row" layout-align="center center">\n  <div>\n    <span class="number"></span><span class="unit" ng-if="$ctrl.unit" ng-bind-html="$ctrl.unitHTML"></span>\n  </div>\n</div>'
    }
    , function(module, exports) {
        module.exports = '<md-icon md-font-set="fa" class="search-icon fa-search"></md-icon>\n<md-autocomplete\n  md-input-name="autocomplete"\n  placeholder="Search location or postcode"\n  md-selected-item="$ctrl.selectedItem"\n  md-selected-item-change="$ctrl.itemSelected(item)"\n  md-search-text="$ctrl.searchText"\n  md-items="item in $ctrl.getMatches($ctrl.searchText)"\n  md-item-text="item.name"\n  md-min-length="4"\n  md-delay="500">\n\n  <md-item-template>\n    <span md-highlight-text="$ctrl.searchText" md-highlight-flags="^i">{{item.name}}</span>\n  </md-item-template>\n\n  <md-not-found>\n    No matches found.\n  </md-not-found>\n\n</md-autocomplete>'
    }
    , function(module, exports) {
        module.exports = '<h2 flex><i class="fa fa-info-circle"></i> Density Index</h2>\n\n<p>\n  The <b>Density Index</b> is a measure of how built-up an area is.<br/>\n  Higher numbers indicate that an area is more built-up.\n</p>\n\n<p>\n  It is calculated by dividing the total building volume in m<sup>3</sup><br/>\n  by the total land area in m<sup>2</sup>.\n</p>\n'
    }
    , function(module, exports) {
        module.exports = '<h2><i class="fa fa-info-circle"></i> Building Height Histogram</h2>\n<p>\n  The histogram shows a breakdown of buildings in the area by height.\n</p>\n\n<p>\n  Buildings are grouped by height at 10m intervals\n  and buildings over 100m<br/> are grouped together in the rightmost bar.\n</p>\n\n<p>\n  Hover over a bar to see the number of buildings in that height range.\n</p>'
    }
    , function(module, exports) {
        module.exports = '<h1 class="info-title">{{$ctrl.polygon.name}} <span class="dim">by Numbers</span></h1>\n\n<div class="loading-container" ng-if="$ctrl.loading" layout layout-align="center center">\n  <md-progress-circular md-diameter="100" md-mode="indeterminate"></md-progress-circular>\n</div>\n\n<md-grid-list md-cols="2" md-gutter="0.5em" md-row-height="1:1" md-on-layout="$ctrl.onLayout($event)">\n  <md-grid-tile>\n    <big-number title="Land Area" value="$ctrl.metrics.polygonArea" unit="km<sup>2</sup>" md-colors="::{background: \'grey-700\'}"></big-number>\n  </md-grid-tile>\n  <md-grid-tile>\n    <big-number title="Building Count" value="$ctrl.metrics.buildingCount" number-format=",.0f" md-colors="::{background: \'grey-700\'}"></big-number>\n  </md-grid-tile>\n  <md-grid-tile>\n    <big-number title="Max Height" value="$ctrl.metrics.maxHeight" number-format=".0f" unit="m" md-colors="::{background: \'grey-700\'}"></big-number>\n  </md-grid-tile>\n  <md-grid-tile>\n    <md-button class="md-icon-button info-button" aria-label="Info" ng-click="$ctrl.showDensityInfo($event)"\n               analytics-on="click" analytics-event="Show Density Info">\n      <md-icon md-font-set="fa" class="fa-info-circle"></md-icon>\n    </md-button>\n    <big-number title="Density Index" value="$ctrl.metrics.volumeRatio" number-format=".2r" md-colors="::{background: \'grey-700\'}"></big-number>\n  </md-grid-tile>\n  <md-grid-tile md-colspan="2">\n    <md-button class="md-icon-button info-button" aria-label="Info" ng-click="$ctrl.showHistogramInfo($event)"\n               analytics-on="click" analytics-event="Show Histogram Info">\n      <md-icon md-font-set="fa" class="fa-info-circle"></md-icon>\n    </md-button>\n    <histogram data="$ctrl.histogramData" md-colors="{background: \'grey-700\'}"></histogram>\n  </md-grid-tile>\n</md-grid-list>\n'
    }
    , function(module, exports) {
        module.exports = '<div class="legend-title">{{$ctrl.title}}</div>\n<ul class="chip-background">\n  <li ng-repeat="stop in $ctrl.legendStops.slice().reverse()">\n    <div class="legend-color-chip" ng-style="{\'background-color\': stop.color}"></div>\n  </li>\n</ul>\n<div class="marker" ng-style="{top: $ctrl.markerPos, opacity: $ctrl.markerOpacity}"></div>\n<ul class="chip-text">\n  <li ng-repeat="stop in $ctrl.legendStops.slice().reverse()">\n    <div class="legend-color-chip">{{stop.value}}</div>\n  </li>\n</ul>'
    }
    , function(module, exports) {
        module.exports = '<div class="loading-container" ng-if="$ctrl.loading" layout layout-align="center center">\n  <md-progress-circular md-diameter="200" md-mode="indeterminate"></md-progress-circular>\n</div>\n\n<mapbox-gl style-src="{{$ctrl.CONFIG.mapStyleUrl}}"\n           options="{showZoomControl: false, zoom: 12, center: [-0.1016822, 51.5157718]}"\n           on-init="$ctrl.onMapLoad(map, plugins)"\n           on-click="$ctrl.onMapClick(event)"\n           on-mouse-move="$ctrl.onMapMouseMove(event)"\n           on-move-end="$ctrl.onMapMoveEnd(center, zoom)"\n           ng-class="{hover: $ctrl.hoveredFeature != null}"\n           ng-style="{opacity: $ctrl.mapOpacity}"\n           >\n\n           <mapbox-gl-draw></mapbox-gl-draw>\n</mapbox-gl>\n\n<md-button ng-click="$ctrl.zoom(1)"\n           class="zoom-button zoom-button-in md-fab md-mini md-primary"\n           aria-label="Zoom In">\n  <md-icon md-font-set="fa" class="fa-plus"></md-icon>\n</md-button>\n\n<md-button ng-click="$ctrl.zoom(-1)"\n           class="zoom-button zoom-button-out md-fab md-mini md-primary"\n           aria-label="Zoom Out">\n  <md-icon md-font-set="fa" class="fa-minus"></md-icon>\n</md-button>\n\n<map-legend title="Building height (m)" value="{{$ctrl.buildingHeight}}"></map-legend>\n'
    }
    , function(module, exports) {
        module.exports = '<div class="building-popup">\n  <h4>Building Information</h4>\n  Latitude: {{props.y | number : 5}}<br/>\n  Longitude: {{props.x | number : 5}}<br/>\n  Max Height: {{props.max | number : 1}}m<br/>\n  Area: {{props.area | number : 0}}m<sup>2</sup><br/>\n  <a class="w3w" href="{{w3w.url}}" target="_blank" ng-if="w3w">\n    {{w3w.words}}\n  </a>\n</div>'
    }
    , function(module, exports) {
        module.exports = '<md-list>\n  <md-subheader class="md-subheader-flex" ng-repeat-start="group in $ctrl.polygons">\n    <md-icon md-font-set="fa" class="fa-building"></md-icon>\n    <p>{{group.title}}</p>\n    <md-icon\n    ng-if="group.allowDrawing"\n    ng-disabled="$ctrl.AppState.ui.drawing"\n    md-font-set="fa"\n    class="fa-plus-circle large"\n    ng-click="$ctrl.addItem(group, $event)"\n    analytics-on="click"\n    analytics-event="Create Area">\n      <md-tooltip md-direction="right" md-delay="500" md-autohide="true">\n          Draw a new area\n      </md-tooltip>\n    </md-icon>\n  </md-subheader>\n\n  <md-list-item ng-if="!group.polygons.length"><p><i>Click\n    <md-icon md-font-set="fa" class="fa-plus-circle"></md-icon>\n    to draw a new area</i></p>\n  </md-list-item>\n\n  <md-list-item ng-repeat-end\n    ng-repeat="item in group.polygons"\n    analytics-on="click"\n    analytics-event="Select City"\n    analytics-label="{{item.name}}"\n    ng-click="$ctrl.itemClicked(item)"\n    class="noright">\n  <p>{{item.name}}</p>\n  <md-icon\n  ng-if="group.allowDrawing"\n  ng-disabled="$ctrl.AppState.ui.drawing"\n  md-font-set="fa"\n  class="fa-pencil md-secondary"\n  ng-click="$ctrl.editItem(item, group)"\n  analytics-on="click"\n  analytics-event="Edit Area">\n    <md-tooltip md-delay="500" md-autohide="true">\n        Edit the area\n    </md-tooltip>\n  </md-icon>\n  <md-icon\n  ng-if="group.allowDrawing"\n  ng-disabled="$ctrl.AppState.ui.drawing"\n  md-font-set="fa"\n  class="fa-trash md-secondary"\n  ng-click="$ctrl.deleteItem(item, group)">\n    <md-tooltip md-delay="500" md-autohide="true">\n        Delete the area\n    </md-tooltip>\n  </md-icon>\n</md-list-item>\n</md-list>\n'
    }
    , function(module, exports) {
        module.exports = '<md-content layout-padding>\n\n  <h4><i class="fa fa-map"></i> Introduction to the Map</h4>\n\n  <p>Welcome to the \'Building Heights in England\' map. Use this interactive map to explore how building density varies across the country\n    and compare the top 25 urban areas in England.</p>\n\n  <p><i class="fa fa-caret-right"></i> <b>Hover over a building</b> to display its height on the map legend (bottom left on the map).</p>\n\n  <p><i class="fa fa-caret-right"></i> <b>Click a building</b> to show additional information including its coordinates and area.\n    You can also discover the <a href="http://what3words.com/" target="_blank">what3words</a> address of the building.</p>\n\n  <p><i class="fa fa-caret-right"></i> <b>Click on an urban area</b> in the list on the left to display building density metrics for the area.</p>\n\n  <p class="md-caption">This visualisation is optimized for viewing in Chrome, Firefox and Safari. LIDAR data was collected in 2014/15.\n   Buildings under construction or built after this time may not have accurate heights reflected.</p>\n\n</md-content>'
    }
    , function(module, exports, __webpack_require__) {
        function geometry(_) {
            var i, area = 0;
            switch (_.type) {
                case "Polygon":
                    return polygonArea(_.coordinates);
                case "MultiPolygon":
                    for (i = 0; i < _.coordinates.length; i++)
                        area += polygonArea(_.coordinates[i]);
                    return area;
                case "Point":
                case "MultiPoint":
                case "LineString":
                case "MultiLineString":
                    return 0;
                case "GeometryCollection":
                    for (i = 0; i < _.geometries.length; i++)
                        area += geometry(_.geometries[i]);
                    return area
            }
        }
        function polygonArea(coords) {
            var area = 0;
            if (coords && coords.length > 0) {
                area += Math.abs(ringArea(coords[0]));
                for (var i = 1; i < coords.length; i++)
                    area -= Math.abs(ringArea(coords[i]))
            }
            return area
        }
        function ringArea(coords) {
            var p1, p2, p3, lowerIndex, middleIndex, upperIndex, i, area = 0, coordsLength = coords.length;
            if (coordsLength > 2) {
                for (i = 0; coordsLength > i; i++)
                    i === coordsLength - 2 ? (lowerIndex = coordsLength - 2,
                        middleIndex = coordsLength - 1,
                        upperIndex = 0) : i === coordsLength - 1 ? (lowerIndex = coordsLength - 1,
                        middleIndex = 0,
                        upperIndex = 1) : (lowerIndex = i,
                        middleIndex = i + 1,
                        upperIndex = i + 2),
                        p1 = coords[lowerIndex],
                        p2 = coords[middleIndex],
                        p3 = coords[upperIndex],
                        area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
                area = area * wgs84.RADIUS * wgs84.RADIUS / 2
            }
            return area
        }
        function rad(_) {
            return _ * Math.PI / 180
        }
        var wgs84 = __webpack_require__(169);
        module.exports.geometry = geometry,
            module.exports.ring = ringArea
    }
    , function(module, exports, __webpack_require__) {
        function geometry(_) {
            var i, area = 0;
            switch (_.type) {
                case "Polygon":
                    return polygonArea(_.coordinates);
                case "MultiPolygon":
                    for (i = 0; i < _.coordinates.length; i++)
                        area += polygonArea(_.coordinates[i]);
                    return area;
                case "Point":
                case "MultiPoint":
                case "LineString":
                case "MultiLineString":
                    return 0;
                case "GeometryCollection":
                    for (i = 0; i < _.geometries.length; i++)
                        area += geometry(_.geometries[i]);
                    return area
            }
        }
        function polygonArea(coords) {
            var area = 0;
            if (coords && coords.length > 0) {
                area += Math.abs(ringArea(coords[0]));
                for (var i = 1; i < coords.length; i++)
                    area -= Math.abs(ringArea(coords[i]))
            }
            return area
        }
        function ringArea(coords) {
            var p1, p2, p3, lowerIndex, middleIndex, upperIndex, area = 0, coordsLength = coords.length;
            if (coordsLength > 2) {
                for (i = 0; i < coordsLength; i++)
                    i === coordsLength - 2 ? (lowerIndex = coordsLength - 2,
                        middleIndex = coordsLength - 1,
                        upperIndex = 0) : i === coordsLength - 1 ? (lowerIndex = coordsLength - 1,
                        middleIndex = 0,
                        upperIndex = 1) : (lowerIndex = i,
                        middleIndex = i + 1,
                        upperIndex = i + 2),
                        p1 = coords[lowerIndex],
                        p2 = coords[middleIndex],
                        p3 = coords[upperIndex],
                        area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
                area = area * wgs84.RADIUS * wgs84.RADIUS / 2
            }
            return area
        }
        function rad(_) {
            return _ * Math.PI / 180
        }
        var wgs84 = __webpack_require__(169);
        module.exports.geometry = geometry,
            module.exports.ring = ringArea
    }
    , function(module, exports, __webpack_require__) {
        var each = __webpack_require__(267).coordEach;
        module.exports = function(geojson) {
            var bbox = [1 / 0, 1 / 0, -(1 / 0), -(1 / 0)];
            return each(geojson, function(coord) {
                bbox[0] > coord[0] && (bbox[0] = coord[0]),
                bbox[1] > coord[1] && (bbox[1] = coord[1]),
                bbox[2] < coord[0] && (bbox[2] = coord[0]),
                bbox[3] < coord[1] && (bbox[3] = coord[1])
            }),
                bbox
        }
    }
    , function(module, exports) {
        function coordEach(layer, callback, excludeWrapCoord) {
            var i, j, k, g, l, geometry, stopG, coords, geometryMaybeCollection, isGeometryCollection, wrapShrink = 0, isFeatureCollection = "FeatureCollection" === layer.type, isFeature = "Feature" === layer.type, stop = isFeatureCollection ? layer.features.length : 1;
            for (i = 0; stop > i; i++)
                for (geometryMaybeCollection = isFeatureCollection ? layer.features[i].geometry : isFeature ? layer.geometry : layer,
                         isGeometryCollection = "GeometryCollection" === geometryMaybeCollection.type,
                         stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1,
                         g = 0; stopG > g; g++)
                    if (geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection,
                        coords = geometry.coordinates,
                        wrapShrink = !excludeWrapCoord || "Polygon" !== geometry.type && "MultiPolygon" !== geometry.type ? 0 : 1,
                    "Point" === geometry.type)
                        callback(coords);
                    else if ("LineString" === geometry.type || "MultiPoint" === geometry.type)
                        for (j = 0; j < coords.length; j++)
                            callback(coords[j]);
                    else if ("Polygon" === geometry.type || "MultiLineString" === geometry.type)
                        for (j = 0; j < coords.length; j++)
                            for (k = 0; k < coords[j].length - wrapShrink; k++)
                                callback(coords[j][k]);
                    else if ("MultiPolygon" === geometry.type)
                        for (j = 0; j < coords.length; j++)
                            for (k = 0; k < coords[j].length; k++)
                                for (l = 0; l < coords[j][k].length - wrapShrink; l++)
                                    callback(coords[j][k][l]);
                    else {
                        if ("GeometryCollection" !== geometry.type)
                            throw new Error("Unknown Geometry Type");
                        for (j = 0; j < geometry.geometries.length; j++)
                            coordEach(geometry.geometries[j], callback, excludeWrapCoord)
                    }
        }
        function coordReduce(layer, callback, memo, excludeWrapCoord) {
            return coordEach(layer, function(coord) {
                memo = callback(memo, coord)
            }, excludeWrapCoord),
                memo
        }
        function propEach(layer, callback) {
            var i;
            switch (layer.type) {
                case "FeatureCollection":
                    for (i = 0; i < layer.features.length; i++)
                        callback(layer.features[i].properties);
                    break;
                case "Feature":
                    callback(layer.properties)
            }
        }
        function propReduce(layer, callback, memo) {
            return propEach(layer, function(prop) {
                memo = callback(memo, prop)
            }),
                memo
        }
        function featureEach(layer, callback) {
            if ("Feature" === layer.type)
                callback(layer);
            else if ("FeatureCollection" === layer.type)
                for (var i = 0; i < layer.features.length; i++)
                    callback(layer.features[i])
        }
        function coordAll(layer) {
            var coords = [];
            return coordEach(layer, function(coord) {
                coords.push(coord)
            }),
                coords
        }
        module.exports.coordEach = coordEach,
            module.exports.coordReduce = coordReduce,
            module.exports.propEach = propEach,
            module.exports.propReduce = propReduce,
            module.exports.featureEach = featureEach,
            module.exports.coordAll = coordAll
    }
    , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports) {
        function Extent() {
            return this instanceof Extent ? (this._bbox = [1 / 0, 1 / 0, -(1 / 0), -(1 / 0)],
                void (this._valid = !1)) : new Extent
        }
        module.exports = Extent,
            Extent.prototype.include = function(ll) {
                return this._valid = !0,
                    this._bbox[0] = Math.min(this._bbox[0], ll[0]),
                    this._bbox[1] = Math.min(this._bbox[1], ll[1]),
                    this._bbox[2] = Math.max(this._bbox[2], ll[0]),
                    this._bbox[3] = Math.max(this._bbox[3], ll[1]),
                    this
            }
            ,
            Extent.prototype.union = function(other) {
                return this._valid = !0,
                    this._bbox[0] = Math.min(this._bbox[0], other[0]),
                    this._bbox[1] = Math.min(this._bbox[1], other[1]),
                    this._bbox[2] = Math.max(this._bbox[2], other[2]),
                    this._bbox[3] = Math.max(this._bbox[3], other[3]),
                    this
            }
            ,
            Extent.prototype.bbox = function() {
                return this._valid ? this._bbox : null
            }
            ,
            Extent.prototype.contains = function(ll) {
                return this._valid ? this._bbox[0] <= ll[0] && this._bbox[1] <= ll[1] && this._bbox[2] >= ll[0] && this._bbox[3] >= ll[1] : null
            }
            ,
            Extent.prototype.polygon = function() {
                return this._valid ? {
                    type: "Polygon",
                    coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]]
                } : null
            }
    }
    , function(module, exports) {
        module.exports = function(list, depth) {
            function _flatten(list) {
                return Array.isArray(list) && list.length && "number" == typeof list[0] ? [list] : list.reduce(function(acc, item) {
                    return Array.isArray(item) && Array.isArray(item[0]) ? acc.concat(_flatten(item)) : (acc.push(item),
                        acc)
                }, [])
            }
            return _flatten(list)
        }
    }
    , function(module, exports, __webpack_require__) {
        var geojsonNormalize = __webpack_require__(470)
            , geojsonFlatten = __webpack_require__(472)
            , flatten = __webpack_require__(468);
        module.exports = function(_) {
            if (!_)
                return [];
            var normalized = geojsonFlatten(geojsonNormalize(_))
                , coordinates = [];
            return normalized.features.forEach(function(feature) {
                feature.geometry && (coordinates = coordinates.concat(flatten(feature.geometry.coordinates)))
            }),
                coordinates
        }
    }
    , function(module, exports) {
        function normalize(gj) {
            if (!gj || !gj.type)
                return null;
            var type = types[gj.type];
            return type ? "geometry" === type ? {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: gj
                }]
            } : "feature" === type ? {
                type: "FeatureCollection",
                features: [gj]
            } : "featurecollection" === type ? gj : void 0 : null
        }
        module.exports = normalize;
        var types = {
            Point: "geometry",
            MultiPoint: "geometry",
            LineString: "geometry",
            MultiLineString: "geometry",
            Polygon: "geometry",
            MultiPolygon: "geometry",
            GeometryCollection: "geometry",
            Feature: "feature",
            FeatureCollection: "featurecollection"
        }
    }
    , function(module, exports, __webpack_require__) {
        function getExtent(_) {
            for (var ext = extent(), coords = geojsonCoords(_), i = 0; i < coords.length; i++)
                ext.include(coords[i]);
            return ext
        }
        var geojsonCoords = __webpack_require__(469)
            , traverse = __webpack_require__(552)
            , extent = __webpack_require__(467);
        module.exports = function(_) {
            return getExtent(_).bbox()
        }
            ,
            module.exports.polygon = function(_) {
                return getExtent(_).polygon()
            }
            ,
            module.exports.bboxify = function(_) {
                return traverse(_).map(function(value) {
                    value && "string" == typeof value.type && (value.bbox = getExtent(value).bbox(),
                        this.update(value))
                })
            }
    }
    , function(module, exports) {
        function flatten(gj, up) {
            switch (gj && gj.type || null) {
                case "FeatureCollection":
                    return gj.features = gj.features.reduce(function(mem, feature) {
                        return mem.concat(flatten(feature))
                    }, []),
                        gj;
                case "Feature":
                    return flatten(gj.geometry).map(function(geom) {
                        return {
                            type: "Feature",
                            properties: JSON.parse(JSON.stringify(gj.properties)),
                            geometry: geom
                        }
                    });
                case "MultiPoint":
                    return gj.coordinates.map(function(_) {
                        return {
                            type: "Point",
                            coordinates: _
                        }
                    });
                case "MultiPolygon":
                    return gj.coordinates.map(function(_) {
                        return {
                            type: "Polygon",
                            coordinates: _
                        }
                    });
                case "MultiLineString":
                    return gj.coordinates.map(function(_) {
                        return {
                            type: "LineString",
                            coordinates: _
                        }
                    });
                case "GeometryCollection":
                    return gj.geometries;
                case "Point":
                case "Polygon":
                case "LineString":
                    return [gj];
                default:
                    return gj
            }
        }
        module.exports = flatten
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , root = __webpack_require__(33)
            , DataView = getNative(root, "DataView");
        module.exports = DataView
    }
    , function(module, exports, __webpack_require__) {
        function Hash(entries) {
            var index = -1
                , length = entries ? entries.length : 0;
            for (this.clear(); ++index < length; ) {
                var entry = entries[index];
                this.set(entry[0], entry[1])
            }
        }
        var hashClear = __webpack_require__(510)
            , hashDelete = __webpack_require__(511)
            , hashGet = __webpack_require__(512)
            , hashHas = __webpack_require__(513)
            , hashSet = __webpack_require__(514);
        Hash.prototype.clear = hashClear,
            Hash.prototype.delete = hashDelete,
            Hash.prototype.get = hashGet,
            Hash.prototype.has = hashHas,
            Hash.prototype.set = hashSet,
            module.exports = Hash
    }
    , function(module, exports, __webpack_require__) {
        function MapCache(entries) {
            var index = -1
                , length = entries ? entries.length : 0;
            for (this.clear(); ++index < length; ) {
                var entry = entries[index];
                this.set(entry[0], entry[1])
            }
        }
        var mapCacheClear = __webpack_require__(526)
            , mapCacheDelete = __webpack_require__(527)
            , mapCacheGet = __webpack_require__(528)
            , mapCacheHas = __webpack_require__(529)
            , mapCacheSet = __webpack_require__(530);
        MapCache.prototype.clear = mapCacheClear,
            MapCache.prototype.delete = mapCacheDelete,
            MapCache.prototype.get = mapCacheGet,
            MapCache.prototype.has = mapCacheHas,
            MapCache.prototype.set = mapCacheSet,
            module.exports = MapCache
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , root = __webpack_require__(33)
            , Promise = getNative(root, "Promise");
        module.exports = Promise
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , root = __webpack_require__(33)
            , Set = getNative(root, "Set");
        module.exports = Set
    }
    , function(module, exports, __webpack_require__) {
        function Stack(entries) {
            this.__data__ = new ListCache(entries)
        }
        var ListCache = __webpack_require__(74)
            , stackClear = __webpack_require__(534)
            , stackDelete = __webpack_require__(535)
            , stackGet = __webpack_require__(536)
            , stackHas = __webpack_require__(537)
            , stackSet = __webpack_require__(538);
        Stack.prototype.clear = stackClear,
            Stack.prototype.delete = stackDelete,
            Stack.prototype.get = stackGet,
            Stack.prototype.has = stackHas,
            Stack.prototype.set = stackSet,
            module.exports = Stack
    }
    , function(module, exports, __webpack_require__) {
        var root = __webpack_require__(33)
            , Symbol = root.Symbol;
        module.exports = Symbol
    }
    , function(module, exports, __webpack_require__) {
        var root = __webpack_require__(33)
            , Uint8Array = root.Uint8Array;
        module.exports = Uint8Array
    }
    , function(module, exports, __webpack_require__) {
        var getNative = __webpack_require__(54)
            , root = __webpack_require__(33)
            , WeakMap = getNative(root, "WeakMap");
        module.exports = WeakMap
    }
    , function(module, exports) {
        function addMapEntry(map, pair) {
            return map.set(pair[0], pair[1]),
                map
        }
        module.exports = addMapEntry
    }
    , function(module, exports) {
        function addSetEntry(set, value) {
            return set.add(value),
                set
        }
        module.exports = addSetEntry
    }
    , function(module, exports) {
        function arrayEach(array, iteratee) {
            for (var index = -1, length = array ? array.length : 0; ++index < length && iteratee(array[index], index, array) !== !1; )
                ;
            return array
        }
        module.exports = arrayEach
    }
    , function(module, exports, __webpack_require__) {
        function arrayLikeKeys(value, inherited) {
            var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : []
                , length = result.length
                , skipIndexes = !!length;
            for (var key in value)
                !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isIndex(key, length)) || result.push(key);
            return result
        }
        var baseTimes = __webpack_require__(494)
            , isArguments = __webpack_require__(540)
            , isArray = __webpack_require__(114)
            , isIndex = __webpack_require__(518)
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = arrayLikeKeys
    }
    , function(module, exports) {
        function arrayPush(array, values) {
            for (var index = -1, length = values.length, offset = array.length; ++index < length; )
                array[offset + index] = values[index];
            return array
        }
        module.exports = arrayPush
    }
    , function(module, exports, __webpack_require__) {
        function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object)
        }
        var copyObject = __webpack_require__(161)
            , keys = __webpack_require__(115);
        module.exports = baseAssign
    }
    , function(module, exports, __webpack_require__) {
        function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
            var result;
            if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)),
            void 0 !== result)
                return result;
            if (!isObject(value))
                return value;
            var isArr = isArray(value);
            if (isArr) {
                if (result = initCloneArray(value),
                    !isDeep)
                    return copyArray(value, result)
            } else {
                var tag = getTag(value)
                    , isFunc = tag == funcTag || tag == genTag;
                if (isBuffer(value))
                    return cloneBuffer(value, isDeep);
                if (tag == objectTag || tag == argsTag || isFunc && !object) {
                    if (isHostObject(value))
                        return object ? value : {};
                    if (result = initCloneObject(isFunc ? {} : value),
                        !isDeep)
                        return copySymbols(value, baseAssign(result, value))
                } else {
                    if (!cloneableTags[tag])
                        return object ? value : {};
                    result = initCloneByTag(value, tag, baseClone, isDeep)
                }
            }
            stack || (stack = new Stack);
            var stacked = stack.get(value);
            if (stacked)
                return stacked;
            if (stack.set(value, result),
                !isArr)
                var props = isFull ? getAllKeys(value) : keys(value);
            return arrayEach(props || value, function(subValue, key) {
                props && (key = subValue,
                    subValue = value[key]),
                    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack))
            }),
                result
        }
        var Stack = __webpack_require__(478)
            , arrayEach = __webpack_require__(484)
            , assignValue = __webpack_require__(160)
            , baseAssign = __webpack_require__(487)
            , cloneBuffer = __webpack_require__(495)
            , copyArray = __webpack_require__(502)
            , copySymbols = __webpack_require__(503)
            , getAllKeys = __webpack_require__(506)
            , getTag = __webpack_require__(508)
            , initCloneArray = __webpack_require__(515)
            , initCloneByTag = __webpack_require__(516)
            , initCloneObject = __webpack_require__(517)
            , isArray = __webpack_require__(114)
            , isBuffer = __webpack_require__(542)
            , isHostObject = __webpack_require__(163)
            , isObject = __webpack_require__(78)
            , keys = __webpack_require__(115)
            , argsTag = "[object Arguments]"
            , arrayTag = "[object Array]"
            , boolTag = "[object Boolean]"
            , dateTag = "[object Date]"
            , errorTag = "[object Error]"
            , funcTag = "[object Function]"
            , genTag = "[object GeneratorFunction]"
            , mapTag = "[object Map]"
            , numberTag = "[object Number]"
            , objectTag = "[object Object]"
            , regexpTag = "[object RegExp]"
            , setTag = "[object Set]"
            , stringTag = "[object String]"
            , symbolTag = "[object Symbol]"
            , weakMapTag = "[object WeakMap]"
            , arrayBufferTag = "[object ArrayBuffer]"
            , dataViewTag = "[object DataView]"
            , float32Tag = "[object Float32Array]"
            , float64Tag = "[object Float64Array]"
            , int8Tag = "[object Int8Array]"
            , int16Tag = "[object Int16Array]"
            , int32Tag = "[object Int32Array]"
            , uint8Tag = "[object Uint8Array]"
            , uint8ClampedTag = "[object Uint8ClampedArray]"
            , uint16Tag = "[object Uint16Array]"
            , uint32Tag = "[object Uint32Array]"
            , cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0,
            cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1,
            module.exports = baseClone
    }
    , function(module, exports, __webpack_require__) {
        function baseCreate(proto) {
            return isObject(proto) ? objectCreate(proto) : {}
        }
        var isObject = __webpack_require__(78)
            , objectCreate = Object.create;
        module.exports = baseCreate
    }
    , function(module, exports, __webpack_require__) {
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result = keysFunc(object);
            return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
        }
        var arrayPush = __webpack_require__(486)
            , isArray = __webpack_require__(114);
        module.exports = baseGetAllKeys
    }
    , function(module, exports) {
        function baseGetTag(value) {
            return objectToString.call(value)
        }
        var objectProto = Object.prototype
            , objectToString = objectProto.toString;
        module.exports = baseGetTag
    }
    , function(module, exports, __webpack_require__) {
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value))
                return !1;
            var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value))
        }
        var isFunction = __webpack_require__(168)
            , isHostObject = __webpack_require__(163)
            , isMasked = __webpack_require__(520)
            , isObject = __webpack_require__(78)
            , toSource = __webpack_require__(165)
            , reRegExpChar = /[\\^$.*+?()[\]{}|]/g
            , reIsHostCtor = /^\[object .+?Constructor\]$/
            , funcProto = Function.prototype
            , objectProto = Object.prototype
            , funcToString = funcProto.toString
            , hasOwnProperty = objectProto.hasOwnProperty
            , reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        module.exports = baseIsNative
    }
    , function(module, exports, __webpack_require__) {
        function baseKeys(object) {
            if (!isPrototype(object))
                return nativeKeys(object);
            var result = [];
            for (var key in Object(object))
                hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
            return result
        }
        var isPrototype = __webpack_require__(164)
            , nativeKeys = __webpack_require__(532)
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = baseKeys
    }
    , function(module, exports) {
        function baseTimes(n, iteratee) {
            for (var index = -1, result = Array(n); ++index < n; )
                result[index] = iteratee(index);
            return result
        }
        module.exports = baseTimes
    }
    , function(module, exports) {
        function cloneBuffer(buffer, isDeep) {
            if (isDeep)
                return buffer.slice();
            var result = new buffer.constructor(buffer.length);
            return buffer.copy(result),
                result
        }
        module.exports = cloneBuffer
    }
    , function(module, exports, __webpack_require__) {
        function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength)
        }
        var cloneArrayBuffer = __webpack_require__(112);
        module.exports = cloneDataView
    }
    , function(module, exports, __webpack_require__) {
        function cloneMap(map, isDeep, cloneFunc) {
            var array = isDeep ? cloneFunc(mapToArray(map), !0) : mapToArray(map);
            return arrayReduce(array, addMapEntry, new map.constructor)
        }
        var addMapEntry = __webpack_require__(482)
            , arrayReduce = __webpack_require__(159)
            , mapToArray = __webpack_require__(531);
        module.exports = cloneMap
    }
    , function(module, exports) {
        function cloneRegExp(regexp) {
            var result = new regexp.constructor(regexp.source,reFlags.exec(regexp));
            return result.lastIndex = regexp.lastIndex,
                result
        }
        var reFlags = /\w*$/;
        module.exports = cloneRegExp
    }
    , function(module, exports, __webpack_require__) {
        function cloneSet(set, isDeep, cloneFunc) {
            var array = isDeep ? cloneFunc(setToArray(set), !0) : setToArray(set);
            return arrayReduce(array, addSetEntry, new set.constructor)
        }
        var addSetEntry = __webpack_require__(483)
            , arrayReduce = __webpack_require__(159)
            , setToArray = __webpack_require__(533);
        module.exports = cloneSet
    }
    , function(module, exports, __webpack_require__) {
        function cloneSymbol(symbol) {
            return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
        }
        var Symbol = __webpack_require__(479)
            , symbolProto = Symbol ? Symbol.prototype : void 0
            , symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
        module.exports = cloneSymbol
    }
    , function(module, exports, __webpack_require__) {
        function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length)
        }
        var cloneArrayBuffer = __webpack_require__(112);
        module.exports = cloneTypedArray
    }
    , function(module, exports) {
        function copyArray(source, array) {
            var index = -1
                , length = source.length;
            for (array || (array = Array(length)); ++index < length; )
                array[index] = source[index];
            return array
        }
        module.exports = copyArray
    }
    , function(module, exports, __webpack_require__) {
        function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object)
        }
        var copyObject = __webpack_require__(161)
            , getSymbols = __webpack_require__(162);
        module.exports = copySymbols
    }
    , function(module, exports, __webpack_require__) {
        var root = __webpack_require__(33)
            , coreJsData = root["__core-js_shared__"];
        module.exports = coreJsData
    }
    , function(module, exports) {
        (function(global) {
                var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
                module.exports = freeGlobal
            }
        ).call(exports, function() {
            return this
        }())
    }
    , function(module, exports, __webpack_require__) {
        function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols)
        }
        var baseGetAllKeys = __webpack_require__(490)
            , getSymbols = __webpack_require__(162)
            , keys = __webpack_require__(115);
        module.exports = getAllKeys
    }
    , function(module, exports, __webpack_require__) {
        var overArg = __webpack_require__(113)
            , getPrototype = overArg(Object.getPrototypeOf, Object);
        module.exports = getPrototype
    }
    , function(module, exports, __webpack_require__) {
        var DataView = __webpack_require__(473)
            , Map = __webpack_require__(111)
            , Promise = __webpack_require__(476)
            , Set = __webpack_require__(477)
            , WeakMap = __webpack_require__(481)
            , baseGetTag = __webpack_require__(491)
            , toSource = __webpack_require__(165)
            , mapTag = "[object Map]"
            , objectTag = "[object Object]"
            , promiseTag = "[object Promise]"
            , setTag = "[object Set]"
            , weakMapTag = "[object WeakMap]"
            , dataViewTag = "[object DataView]"
            , objectProto = Object.prototype
            , objectToString = objectProto.toString
            , dataViewCtorString = toSource(DataView)
            , mapCtorString = toSource(Map)
            , promiseCtorString = toSource(Promise)
            , setCtorString = toSource(Set)
            , weakMapCtorString = toSource(WeakMap)
            , getTag = baseGetTag;
        (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) && (getTag = function(value) {
                var result = objectToString.call(value)
                    , Ctor = result == objectTag ? value.constructor : void 0
                    , ctorString = Ctor ? toSource(Ctor) : void 0;
                if (ctorString)
                    switch (ctorString) {
                        case dataViewCtorString:
                            return dataViewTag;
                        case mapCtorString:
                            return mapTag;
                        case promiseCtorString:
                            return promiseTag;
                        case setCtorString:
                            return setTag;
                        case weakMapCtorString:
                            return weakMapTag
                    }
                return result
            }
        ),
            module.exports = getTag
    }
    , function(module, exports) {
        function getValue(object, key) {
            return null == object ? void 0 : object[key]
        }
        module.exports = getValue
    }
    , function(module, exports, __webpack_require__) {
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {}
        }
        var nativeCreate = __webpack_require__(77);
        module.exports = hashClear
    }
    , function(module, exports) {
        function hashDelete(key) {
            return this.has(key) && delete this.__data__[key]
        }
        module.exports = hashDelete
    }
    , function(module, exports, __webpack_require__) {
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? void 0 : result
            }
            return hasOwnProperty.call(data, key) ? data[key] : void 0
        }
        var nativeCreate = __webpack_require__(77)
            , HASH_UNDEFINED = "__lodash_hash_undefined__"
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = hashGet
    }
    , function(module, exports, __webpack_require__) {
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key)
        }
        var nativeCreate = __webpack_require__(77)
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = hashHas
    }
    , function(module, exports, __webpack_require__) {
        function hashSet(key, value) {
            var data = this.__data__;
            return data[key] = nativeCreate && void 0 === value ? HASH_UNDEFINED : value,
                this
        }
        var nativeCreate = __webpack_require__(77)
            , HASH_UNDEFINED = "__lodash_hash_undefined__";
        module.exports = hashSet
    }
    , function(module, exports) {
        function initCloneArray(array) {
            var length = array.length
                , result = array.constructor(length);
            return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index,
                result.input = array.input),
                result
        }
        var objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty;
        module.exports = initCloneArray
    }
    , function(module, exports, __webpack_require__) {
        function initCloneByTag(object, tag, cloneFunc, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
                case arrayBufferTag:
                    return cloneArrayBuffer(object);
                case boolTag:
                case dateTag:
                    return new Ctor(+object);
                case dataViewTag:
                    return cloneDataView(object, isDeep);
                case float32Tag:
                case float64Tag:
                case int8Tag:
                case int16Tag:
                case int32Tag:
                case uint8Tag:
                case uint8ClampedTag:
                case uint16Tag:
                case uint32Tag:
                    return cloneTypedArray(object, isDeep);
                case mapTag:
                    return cloneMap(object, isDeep, cloneFunc);
                case numberTag:
                case stringTag:
                    return new Ctor(object);
                case regexpTag:
                    return cloneRegExp(object);
                case setTag:
                    return cloneSet(object, isDeep, cloneFunc);
                case symbolTag:
                    return cloneSymbol(object)
            }
        }
        var cloneArrayBuffer = __webpack_require__(112)
            , cloneDataView = __webpack_require__(496)
            , cloneMap = __webpack_require__(497)
            , cloneRegExp = __webpack_require__(498)
            , cloneSet = __webpack_require__(499)
            , cloneSymbol = __webpack_require__(500)
            , cloneTypedArray = __webpack_require__(501)
            , boolTag = "[object Boolean]"
            , dateTag = "[object Date]"
            , mapTag = "[object Map]"
            , numberTag = "[object Number]"
            , regexpTag = "[object RegExp]"
            , setTag = "[object Set]"
            , stringTag = "[object String]"
            , symbolTag = "[object Symbol]"
            , arrayBufferTag = "[object ArrayBuffer]"
            , dataViewTag = "[object DataView]"
            , float32Tag = "[object Float32Array]"
            , float64Tag = "[object Float64Array]"
            , int8Tag = "[object Int8Array]"
            , int16Tag = "[object Int16Array]"
            , int32Tag = "[object Int32Array]"
            , uint8Tag = "[object Uint8Array]"
            , uint8ClampedTag = "[object Uint8ClampedArray]"
            , uint16Tag = "[object Uint16Array]"
            , uint32Tag = "[object Uint32Array]";
        module.exports = initCloneByTag
    }
    , function(module, exports, __webpack_require__) {
        function initCloneObject(object) {
            return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object))
        }
        var baseCreate = __webpack_require__(489)
            , getPrototype = __webpack_require__(507)
            , isPrototype = __webpack_require__(164);
        module.exports = initCloneObject
    }
    , function(module, exports) {
        function isIndex(value, length) {
            return length = null == length ? MAX_SAFE_INTEGER : length,
            !!length && ("number" == typeof value || reIsUint.test(value)) && value > -1 && value % 1 == 0 && length > value
        }
        var MAX_SAFE_INTEGER = 9007199254740991
            , reIsUint = /^(?:0|[1-9]\d*)$/;
        module.exports = isIndex
    }
    , function(module, exports) {
        function isKeyable(value) {
            var type = typeof value;
            return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value
        }
        module.exports = isKeyable
    }
    , function(module, exports, __webpack_require__) {
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func
        }
        var coreJsData = __webpack_require__(504)
            , maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : ""
        }();
        module.exports = isMasked
    }
    , function(module, exports) {
        function listCacheClear() {
            this.__data__ = []
        }
        module.exports = listCacheClear
    }
    , function(module, exports, __webpack_require__) {
        function listCacheDelete(key) {
            var data = this.__data__
                , index = assocIndexOf(data, key);
            if (0 > index)
                return !1;
            var lastIndex = data.length - 1;
            return index == lastIndex ? data.pop() : splice.call(data, index, 1),
                !0
        }
        var assocIndexOf = __webpack_require__(75)
            , arrayProto = Array.prototype
            , splice = arrayProto.splice;
        module.exports = listCacheDelete
    }
    , function(module, exports, __webpack_require__) {
        function listCacheGet(key) {
            var data = this.__data__
                , index = assocIndexOf(data, key);
            return 0 > index ? void 0 : data[index][1]
        }
        var assocIndexOf = __webpack_require__(75);
        module.exports = listCacheGet
    }
    , function(module, exports, __webpack_require__) {
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1
        }
        var assocIndexOf = __webpack_require__(75);
        module.exports = listCacheHas
    }
    , function(module, exports, __webpack_require__) {
        function listCacheSet(key, value) {
            var data = this.__data__
                , index = assocIndexOf(data, key);
            return 0 > index ? data.push([key, value]) : data[index][1] = value,
                this
        }
        var assocIndexOf = __webpack_require__(75);
        module.exports = listCacheSet
    }
    , function(module, exports, __webpack_require__) {
        function mapCacheClear() {
            this.__data__ = {
                hash: new Hash,
                map: new (Map || ListCache),
                string: new Hash
            }
        }
        var Hash = __webpack_require__(474)
            , ListCache = __webpack_require__(74)
            , Map = __webpack_require__(111);
        module.exports = mapCacheClear
    }
    , function(module, exports, __webpack_require__) {
        function mapCacheDelete(key) {
            return getMapData(this, key).delete(key)
        }
        var getMapData = __webpack_require__(76);
        module.exports = mapCacheDelete
    }
    , function(module, exports, __webpack_require__) {
        function mapCacheGet(key) {
            return getMapData(this, key).get(key)
        }
        var getMapData = __webpack_require__(76);
        module.exports = mapCacheGet
    }
    , function(module, exports, __webpack_require__) {
        function mapCacheHas(key) {
            return getMapData(this, key).has(key)
        }
        var getMapData = __webpack_require__(76);
        module.exports = mapCacheHas
    }
    , function(module, exports, __webpack_require__) {
        function mapCacheSet(key, value) {
            return getMapData(this, key).set(key, value),
                this
        }
        var getMapData = __webpack_require__(76);
        module.exports = mapCacheSet
    }
    , function(module, exports) {
        function mapToArray(map) {
            var index = -1
                , result = Array(map.size);
            return map.forEach(function(value, key) {
                result[++index] = [key, value]
            }),
                result
        }
        module.exports = mapToArray
    }
    , function(module, exports, __webpack_require__) {
        var overArg = __webpack_require__(113)
            , nativeKeys = overArg(Object.keys, Object);
        module.exports = nativeKeys
    }
    , function(module, exports) {
        function setToArray(set) {
            var index = -1
                , result = Array(set.size);
            return set.forEach(function(value) {
                result[++index] = value
            }),
                result
        }
        module.exports = setToArray
    }
    , function(module, exports, __webpack_require__) {
        function stackClear() {
            this.__data__ = new ListCache
        }
        var ListCache = __webpack_require__(74);
        module.exports = stackClear
    }
    , function(module, exports) {
        function stackDelete(key) {
            return this.__data__.delete(key)
        }
        module.exports = stackDelete
    }
    , function(module, exports) {
        function stackGet(key) {
            return this.__data__.get(key)
        }
        module.exports = stackGet
    }
    , function(module, exports) {
        function stackHas(key) {
            return this.__data__.has(key)
        }
        module.exports = stackHas
    }
    , function(module, exports, __webpack_require__) {
        function stackSet(key, value) {
            var cache = this.__data__;
            if (cache instanceof ListCache) {
                var pairs = cache.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1)
                    return pairs.push([key, value]),
                        this;
                cache = this.__data__ = new MapCache(pairs)
            }
            return cache.set(key, value),
                this
        }
        var ListCache = __webpack_require__(74)
            , Map = __webpack_require__(111)
            , MapCache = __webpack_require__(475)
            , LARGE_ARRAY_SIZE = 200;
        module.exports = stackSet
    }
    , function(module, exports, __webpack_require__) {
        function cloneDeep(value) {
            return baseClone(value, !0, !0)
        }
        var baseClone = __webpack_require__(488);
        module.exports = cloneDeep
    }
    , function(module, exports, __webpack_require__) {
        function isArguments(value) {
            return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag)
        }
        var isArrayLikeObject = __webpack_require__(541)
            , argsTag = "[object Arguments]"
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty
            , objectToString = objectProto.toString
            , propertyIsEnumerable = objectProto.propertyIsEnumerable;
        module.exports = isArguments
    }
    , function(module, exports, __webpack_require__) {
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value)
        }
        var isArrayLike = __webpack_require__(167)
            , isObjectLike = __webpack_require__(544);
        module.exports = isArrayLikeObject
    }
    , function(module, exports, __webpack_require__) {
        (function(module) {
                var root = __webpack_require__(33)
                    , stubFalse = __webpack_require__(546)
                    , freeExports = "object" == typeof exports && exports && !exports.nodeType && exports
                    , freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module
                    , moduleExports = freeModule && freeModule.exports === freeExports
                    , Buffer = moduleExports ? root.Buffer : void 0
                    , nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0
                    , isBuffer = nativeIsBuffer || stubFalse;
                module.exports = isBuffer
            }
        ).call(exports, __webpack_require__(117)(module))
    }
    , function(module, exports) {
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value
        }
        var MAX_SAFE_INTEGER = 9007199254740991;
        module.exports = isLength
    }
    , function(module, exports) {
        function isObjectLike(value) {
            return !!value && "object" == typeof value
        }
        module.exports = isObjectLike
    }
    , function(module, exports) {
        function stubArray() {
            return []
        }
        module.exports = stubArray
    }
    , function(module, exports) {
        function stubFalse() {
            return !1
        }
        module.exports = stubFalse
    }
    , , , function(module, exports) {}
    , function(module, exports, __webpack_require__) {
        (function(process) {
                function normalizeArray(parts, allowAboveRoot) {
                    for (var up = 0, i = parts.length - 1; i >= 0; i--) {
                        var last = parts[i];
                        "." === last ? parts.splice(i, 1) : ".." === last ? (parts.splice(i, 1),
                            up++) : up && (parts.splice(i, 1),
                            up--)
                    }
                    if (allowAboveRoot)
                        for (; up--; up)
                            parts.unshift("..");
                    return parts
                }
                function filter(xs, f) {
                    if (xs.filter)
                        return xs.filter(f);
                    for (var res = [], i = 0; i < xs.length; i++)
                        f(xs[i], i, xs) && res.push(xs[i]);
                    return res
                }
                var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    , splitPath = function(filename) {
                    return splitPathRe.exec(filename).slice(1)
                };
                exports.resolve = function() {
                    for (var resolvedPath = "", resolvedAbsolute = !1, i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                        var path = i >= 0 ? arguments[i] : process.cwd();
                        if ("string" != typeof path)
                            throw new TypeError("Arguments to path.resolve must be strings");
                        path && (resolvedPath = path + "/" + resolvedPath,
                            resolvedAbsolute = "/" === path.charAt(0))
                    }
                    return resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
                        return !!p
                    }), !resolvedAbsolute).join("/"),
                    (resolvedAbsolute ? "/" : "") + resolvedPath || "."
                }
                    ,
                    exports.normalize = function(path) {
                        var isAbsolute = exports.isAbsolute(path)
                            , trailingSlash = "/" === substr(path, -1);
                        return path = normalizeArray(filter(path.split("/"), function(p) {
                            return !!p
                        }), !isAbsolute).join("/"),
                        path || isAbsolute || (path = "."),
                        path && trailingSlash && (path += "/"),
                        (isAbsolute ? "/" : "") + path
                    }
                    ,
                    exports.isAbsolute = function(path) {
                        return "/" === path.charAt(0)
                    }
                    ,
                    exports.join = function() {
                        var paths = Array.prototype.slice.call(arguments, 0);
                        return exports.normalize(filter(paths, function(p, index) {
                            if ("string" != typeof p)
                                throw new TypeError("Arguments to path.join must be strings");
                            return p
                        }).join("/"))
                    }
                    ,
                    exports.relative = function(from, to) {
                        function trim(arr) {
                            for (var start = 0; start < arr.length && "" === arr[start]; start++)
                                ;
                            for (var end = arr.length - 1; end >= 0 && "" === arr[end]; end--)
                                ;
                            return start > end ? [] : arr.slice(start, end - start + 1)
                        }
                        from = exports.resolve(from).substr(1),
                            to = exports.resolve(to).substr(1);
                        for (var fromParts = trim(from.split("/")), toParts = trim(to.split("/")), length = Math.min(fromParts.length, toParts.length), samePartsLength = length, i = 0; length > i; i++)
                            if (fromParts[i] !== toParts[i]) {
                                samePartsLength = i;
                                break
                            }
                        for (var outputParts = [], i = samePartsLength; i < fromParts.length; i++)
                            outputParts.push("..");
                        return outputParts = outputParts.concat(toParts.slice(samePartsLength)),
                            outputParts.join("/")
                    }
                    ,
                    exports.sep = "/",
                    exports.delimiter = ":",
                    exports.dirname = function(path) {
                        var result = splitPath(path)
                            , root = result[0]
                            , dir = result[1];
                        return root || dir ? (dir && (dir = dir.substr(0, dir.length - 1)),
                        root + dir) : "."
                    }
                    ,
                    exports.basename = function(path, ext) {
                        var f = splitPath(path)[2];
                        return ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length)),
                            f
                    }
                    ,
                    exports.extname = function(path) {
                        return splitPath(path)[3]
                    }
                ;
                var substr = "b" === "ab".substr(-1) ? function(str, start, len) {
                        return str.substr(start, len)
                    }
                    : function(str, start, len) {
                        return 0 > start && (start = str.length + start),
                            str.substr(start, len)
                    }
            }
        ).call(exports, __webpack_require__(116))
    }
    , , function(module, exports) {
        function Traverse(obj) {
            this.value = obj
        }
        function walk(root, cb, immutable) {
            var path = []
                , parents = []
                , alive = !0;
            return function walker(node_) {
                function updateState() {
                    if ("object" == typeof state.node && null !== state.node) {
                        state.keys && state.node_ === state.node || (state.keys = objectKeys(state.node)),
                            state.isLeaf = 0 == state.keys.length;
                        for (var i = 0; i < parents.length; i++)
                            if (parents[i].node_ === node_) {
                                state.circular = parents[i];
                                break
                            }
                    } else
                        state.isLeaf = !0,
                            state.keys = null;
                    state.notLeaf = !state.isLeaf,
                        state.notRoot = !state.isRoot
                }
                var node = immutable ? copy(node_) : node_
                    , modifiers = {}
                    , keepGoing = !0
                    , state = {
                    node: node,
                    node_: node_,
                    path: [].concat(path),
                    parent: parents[parents.length - 1],
                    parents: parents,
                    key: path.slice(-1)[0],
                    isRoot: 0 === path.length,
                    level: path.length,
                    circular: null,
                    update: function(x, stopHere) {
                        state.isRoot || (state.parent.node[state.key] = x),
                            state.node = x,
                        stopHere && (keepGoing = !1)
                    },
                    "delete": function(stopHere) {
                        delete state.parent.node[state.key],
                        stopHere && (keepGoing = !1)
                    },
                    remove: function(stopHere) {
                        isArray(state.parent.node) ? state.parent.node.splice(state.key, 1) : delete state.parent.node[state.key],
                        stopHere && (keepGoing = !1)
                    },
                    keys: null,
                    before: function(f) {
                        modifiers.before = f
                    },
                    after: function(f) {
                        modifiers.after = f
                    },
                    pre: function(f) {
                        modifiers.pre = f
                    },
                    post: function(f) {
                        modifiers.post = f
                    },
                    stop: function() {
                        alive = !1
                    },
                    block: function() {
                        keepGoing = !1
                    }
                };
                if (!alive)
                    return state;
                updateState();
                var ret = cb.call(state, state.node);
                return void 0 !== ret && state.update && state.update(ret),
                modifiers.before && modifiers.before.call(state, state.node),
                    keepGoing ? ("object" != typeof state.node || null === state.node || state.circular || (parents.push(state),
                        updateState(),
                        forEach(state.keys, function(key, i) {
                            path.push(key),
                            modifiers.pre && modifiers.pre.call(state, state.node[key], key);
                            var child = walker(state.node[key]);
                            immutable && hasOwnProperty.call(state.node, key) && (state.node[key] = child.node),
                                child.isLast = i == state.keys.length - 1,
                                child.isFirst = 0 == i,
                            modifiers.post && modifiers.post.call(state, child),
                                path.pop()
                        }),
                        parents.pop()),
                    modifiers.after && modifiers.after.call(state, state.node),
                        state) : state
            }(root).node
        }
        function copy(src) {
            if ("object" == typeof src && null !== src) {
                var dst;
                if (isArray(src))
                    dst = [];
                else if (isDate(src))
                    dst = new Date(src.getTime ? src.getTime() : src);
                else if (isRegExp(src))
                    dst = new RegExp(src);
                else if (isError(src))
                    dst = {
                        message: src.message
                    };
                else if (isBoolean(src))
                    dst = new Boolean(src);
                else if (isNumber(src))
                    dst = new Number(src);
                else if (isString(src))
                    dst = new String(src);
                else if (Object.create && Object.getPrototypeOf)
                    dst = Object.create(Object.getPrototypeOf(src));
                else if (src.constructor === Object)
                    dst = {};
                else {
                    var proto = src.constructor && src.constructor.prototype || src.__proto__ || {}
                        , T = function() {};
                    T.prototype = proto,
                        dst = new T
                }
                return forEach(objectKeys(src), function(key) {
                    dst[key] = src[key]
                }),
                    dst
            }
            return src
        }
        function toS(obj) {
            return Object.prototype.toString.call(obj)
        }
        function isDate(obj) {
            return "[object Date]" === toS(obj)
        }
        function isRegExp(obj) {
            return "[object RegExp]" === toS(obj)
        }
        function isError(obj) {
            return "[object Error]" === toS(obj)
        }
        function isBoolean(obj) {
            return "[object Boolean]" === toS(obj)
        }
        function isNumber(obj) {
            return "[object Number]" === toS(obj)
        }
        function isString(obj) {
            return "[object String]" === toS(obj)
        }
        var traverse = module.exports = function(obj) {
                return new Traverse(obj)
            }
        ;
        Traverse.prototype.get = function(ps) {
            for (var node = this.value, i = 0; i < ps.length; i++) {
                var key = ps[i];
                if (!node || !hasOwnProperty.call(node, key)) {
                    node = void 0;
                    break
                }
                node = node[key]
            }
            return node
        }
            ,
            Traverse.prototype.has = function(ps) {
                for (var node = this.value, i = 0; i < ps.length; i++) {
                    var key = ps[i];
                    if (!node || !hasOwnProperty.call(node, key))
                        return !1;
                    node = node[key]
                }
                return !0
            }
            ,
            Traverse.prototype.set = function(ps, value) {
                for (var node = this.value, i = 0; i < ps.length - 1; i++) {
                    var key = ps[i];
                    hasOwnProperty.call(node, key) || (node[key] = {}),
                        node = node[key]
                }
                return node[ps[i]] = value,
                    value
            }
            ,
            Traverse.prototype.map = function(cb) {
                return walk(this.value, cb, !0)
            }
            ,
            Traverse.prototype.forEach = function(cb) {
                return this.value = walk(this.value, cb, !1),
                    this.value
            }
            ,
            Traverse.prototype.reduce = function(cb, init) {
                var skip = 1 === arguments.length
                    , acc = skip ? this.value : init;
                return this.forEach(function(x) {
                    this.isRoot && skip || (acc = cb.call(this, acc, x))
                }),
                    acc
            }
            ,
            Traverse.prototype.paths = function() {
                var acc = [];
                return this.forEach(function(x) {
                    acc.push(this.path)
                }),
                    acc
            }
            ,
            Traverse.prototype.nodes = function() {
                var acc = [];
                return this.forEach(function(x) {
                    acc.push(this.node)
                }),
                    acc
            }
            ,
            Traverse.prototype.clone = function() {
                var parents = []
                    , nodes = [];
                return function clone(src) {
                    for (var i = 0; i < parents.length; i++)
                        if (parents[i] === src)
                            return nodes[i];
                    if ("object" == typeof src && null !== src) {
                        var dst = copy(src);
                        return parents.push(src),
                            nodes.push(dst),
                            forEach(objectKeys(src), function(key) {
                                dst[key] = clone(src[key])
                            }),
                            parents.pop(),
                            nodes.pop(),
                            dst
                    }
                    return src
                }(this.value)
            }
        ;
        var objectKeys = Object.keys || function(obj) {
            var res = [];
            for (var key in obj)
                res.push(key);
            return res
        }
            , isArray = Array.isArray || function(xs) {
            return "[object Array]" === Object.prototype.toString.call(xs)
        }
            , forEach = function(xs, fn) {
            if (xs.forEach)
                return xs.forEach(fn);
            for (var i = 0; i < xs.length; i++)
                fn(xs[i], i, xs)
        };
        forEach(objectKeys(Traverse.prototype), function(key) {
            traverse[key] = function(obj) {
                var args = [].slice.call(arguments, 1)
                    , t = new Traverse(obj);
                return t[key].apply(t, args)
            }
        });
        var hasOwnProperty = Object.hasOwnProperty || function(obj, key) {
            return key in obj
        }
    }
    , function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        !function(exports) {
            "use strict";
            function EventEmitter() {}
            function indexOfListener(listeners, listener) {
                for (var i = listeners.length; i--; )
                    if (listeners[i].listener === listener)
                        return i;
                return -1
            }
            function alias(name) {
                return function() {
                    return this[name].apply(this, arguments)
                }
            }
            function isValidListener(listener) {
                return "function" == typeof listener || listener instanceof RegExp ? !0 : listener && "object" == typeof listener ? isValidListener(listener.listener) : !1
            }
            var proto = EventEmitter.prototype
                , originalGlobalValue = exports.EventEmitter;
            proto.getListeners = function(evt) {
                var response, key, events = this._getEvents();
                if (evt instanceof RegExp) {
                    response = {};
                    for (key in events)
                        events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key])
                } else
                    response = events[evt] || (events[evt] = []);
                return response
            }
                ,
                proto.flattenListeners = function(listeners) {
                    var i, flatListeners = [];
                    for (i = 0; i < listeners.length; i += 1)
                        flatListeners.push(listeners[i].listener);
                    return flatListeners
                }
                ,
                proto.getListenersAsObject = function(evt) {
                    var response, listeners = this.getListeners(evt);
                    return listeners instanceof Array && (response = {},
                        response[evt] = listeners),
                    response || listeners
                }
                ,
                proto.addListener = function(evt, listener) {
                    if (!isValidListener(listener))
                        throw new TypeError("listener must be a function");
                    var key, listeners = this.getListenersAsObject(evt), listenerIsWrapped = "object" == typeof listener;
                    for (key in listeners)
                        listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
                            listener: listener,
                            once: !1
                        });
                    return this
                }
                ,
                proto.on = alias("addListener"),
                proto.addOnceListener = function(evt, listener) {
                    return this.addListener(evt, {
                        listener: listener,
                        once: !0
                    })
                }
                ,
                proto.once = alias("addOnceListener"),
                proto.defineEvent = function(evt) {
                    return this.getListeners(evt),
                        this
                }
                ,
                proto.defineEvents = function(evts) {
                    for (var i = 0; i < evts.length; i += 1)
                        this.defineEvent(evts[i]);
                    return this
                }
                ,
                proto.removeListener = function(evt, listener) {
                    var index, key, listeners = this.getListenersAsObject(evt);
                    for (key in listeners)
                        listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener),
                        -1 !== index && listeners[key].splice(index, 1));
                    return this
                }
                ,
                proto.off = alias("removeListener"),
                proto.addListeners = function(evt, listeners) {
                    return this.manipulateListeners(!1, evt, listeners)
                }
                ,
                proto.removeListeners = function(evt, listeners) {
                    return this.manipulateListeners(!0, evt, listeners)
                }
                ,
                proto.manipulateListeners = function(remove, evt, listeners) {
                    var i, value, single = remove ? this.removeListener : this.addListener, multiple = remove ? this.removeListeners : this.addListeners;
                    if ("object" != typeof evt || evt instanceof RegExp)
                        for (i = listeners.length; i--; )
                            single.call(this, evt, listeners[i]);
                    else
                        for (i in evt)
                            evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
                    return this
                }
                ,
                proto.removeEvent = function(evt) {
                    var key, type = typeof evt, events = this._getEvents();
                    if ("string" === type)
                        delete events[evt];
                    else if (evt instanceof RegExp)
                        for (key in events)
                            events.hasOwnProperty(key) && evt.test(key) && delete events[key];
                    else
                        delete this._events;
                    return this
                }
                ,
                proto.removeAllListeners = alias("removeEvent"),
                proto.emitEvent = function(evt, args) {
                    var listeners, listener, i, key, response, listenersMap = this.getListenersAsObject(evt);
                    for (key in listenersMap)
                        if (listenersMap.hasOwnProperty(key))
                            for (listeners = listenersMap[key].slice(0),
                                     i = 0; i < listeners.length; i++)
                                listener = listeners[i],
                                listener.once === !0 && this.removeListener(evt, listener.listener),
                                    response = listener.listener.apply(this, args || []),
                                response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
                    return this
                }
                ,
                proto.trigger = alias("emitEvent"),
                proto.emit = function(evt) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    return this.emitEvent(evt, args)
                }
                ,
                proto.setOnceReturnValue = function(value) {
                    return this._onceReturnValue = value,
                        this
                }
                ,
                proto._getOnceReturnValue = function() {
                    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
                }
                ,
                proto._getEvents = function() {
                    return this._events || (this._events = {})
                }
                ,
                EventEmitter.noConflict = function() {
                    return exports.EventEmitter = originalGlobalValue,
                        EventEmitter
                }
                ,
                __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return EventEmitter
                }
                    .call(exports, __webpack_require__, exports, module),
                !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }(this || {})
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(171);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(172);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(173);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(174);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(175);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(176);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(177);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(178);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(179);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
    , function(module, exports, __webpack_require__) {
        var content = __webpack_require__(180);
        "string" == typeof content && (content = [[module.id, content, ""]]);
        __webpack_require__(24)(content, {});
        content.locals && (module.exports = content.locals)
    }
]);
//# sourceMappingURL=app.bbc3572324ef7f33db60.map
