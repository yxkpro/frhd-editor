!function(){"use strict";function e(e){this.drawAngle=0,this.colors=e,this.createVersion()}var r=GameInventoryManager.HeadClass,o=Math.max,i={},T=0,v=0,u=e.prototype=new r;u.versionName="",u.dirty=!0,u.getVersions=function(){return i},u.cache=function(e){var r=i[this.versionName];r.dirty=!1;var u=115*(e=o(e,1))*.2,b=120*e*.2,C=r.canvas;C.width=u,C.height=b,T=C.width/2,v=C.height/2;var z=C.getContext("2d"),t=.2*e,l=this.colors;z.scale(t,t),z.save(),z.translate(0,0),z.beginPath(),z.moveTo(0,0),z.lineTo(103.421,0),z.lineTo(103.421,101.644),z.lineTo(0,101.644),z.closePath(),z.clip(),z.translate(0,0),z.translate(0,0),z.scale(1,1),z.translate(-3.279,14.237),z.strokeStyle="rgba(0,0,0,0)",z.lineCap="butt",z.lineJoin="miter",z.miterLimit=4,z.save(),z.save(),z.fillStyle=l.mask,z.beginPath(),z.moveTo(89.19,49.064),z.lineTo(88.943,48.806),z.bezierCurveTo(88.332,48.15,87.714,47.498,87.095,46.846999999999994),z.bezierCurveTo(85.984,45.675999999999995,84.835,44.465999999999994,83.746,43.24399999999999),z.bezierCurveTo(80.954,40.11099999999999,79.446,37.10099999999999,79.265,34.300999999999995),z.bezierCurveTo(79.244,33.95399999999999,79.259,33.611999999999995,79.277,33.24999999999999),z.bezierCurveTo(79.29,32.97399999999999,79.302,32.69799999999999,79.298,32.42199999999999),z.bezierCurveTo(79.254,29.63799999999999,78.944,26.89099999999999,78.375,24.25599999999999),z.lineTo(78.038,22.69399999999999),z.lineTo(77.88199999999999,24.28399999999999),z.bezierCurveTo(77.27699999999999,30.447999999999986,71.764,35.66499999999999,65.05999999999999,36.41899999999999),z.bezierCurveTo(64.56299999999999,36.47499999999999,64.05799999999999,36.50299999999999,63.55999999999999,36.50299999999999),z.bezierCurveTo(58.84699999999999,36.50299999999999,54.813999999999986,34.04699999999999,53.03699999999999,30.092999999999993),z.bezierCurveTo(47.04899999999999,16.767999999999994,51.86699999999999,10.830999999999992,54.21699999999999,8.896999999999991),z.bezierCurveTo(56.12299999999999,7.327999999999991,58.54999999999999,6.4639999999999915,61.04999999999999,6.4639999999999915),z.bezierCurveTo(62.44099999999999,6.4639999999999915,63.81199999999999,6.7219999999999915,65.12599999999999,7.230999999999992),z.bezierCurveTo(68.44699999999999,8.517999999999992,71.538,11.095999999999993,74.57499999999999,15.112999999999992),z.lineTo(74.996,14.846999999999992),z.bezierCurveTo(70.846,6.876,63.593,.124,55.593,-3.216),z.bezierCurveTo(55.236000000000004,-3.365,54.887,-3.5210000000000004,54.543000000000006,-3.676),z.bezierCurveTo(53.357000000000006,-4.206,52.23800000000001,-4.707,50.895,-4.901),z.bezierCurveTo(49.188,-5.147,47.452000000000005,-4.934,45.872,-4.286),z.bezierCurveTo(43.224,-3.199,40.87,-.9879999999999995,38.679,2.474),z.bezierCurveTo(35.107,8.118,32.689,15.313,31.286,24.472),z.lineTo(31.242,24.76),z.lineTo(31.533,24.76),z.bezierCurveTo(33.364000000000004,24.76,35.257000000000005,24.76,36.2,26.638),z.bezierCurveTo(36.672000000000004,27.576,36.625,28.847,36.583000000000006,29.970000000000002),z.bezierCurveTo(36.571000000000005,30.292,36.56,30.606,36.56,30.902),z.bezierCurveTo(36.56,31.321,36.575,31.748,36.589000000000006,32.179),z.bezierCurveTo(36.620000000000005,33.122,36.653000000000006,34.097,36.529,35.006),z.bezierCurveTo(36.38,36.099000000000004,35.673,37.087,34.682,37.585),z.bezierCurveTo(34.02,37.918,33.317,37.945,32.532000000000004,37.945),z.lineTo(31.868000000000002,37.945),z.lineTo(31.973000000000003,38.272),z.bezierCurveTo(33.463,42.855999999999995,35.903000000000006,47.352999999999994,39.027,51.275999999999996),z.lineTo(39.278,51.592),z.lineTo(39.449,51.225),z.bezierCurveTo(40.372,49.238,41.714999999999996,47.4,43.330999999999996,45.910000000000004),z.bezierCurveTo(46.394999999999996,43.087,50.425,41.532000000000004,54.681,41.532000000000004),z.bezierCurveTo(58.937,41.532000000000004,62.971,43.087,66.038,45.909000000000006),z.bezierCurveTo(68.99499999999999,48.63000000000001,70.883,52.312000000000005,71.353,56.27600000000001),z.bezierCurveTo(71.63799999999999,58.68000000000001,71.395,61.15800000000001,70.649,63.44300000000001),z.bezierCurveTo(70.435,64.09700000000001,70.173,64.75500000000001,69.872,65.39800000000001),z.bezierCurveTo(69.743,65.66900000000001,69.607,65.936,69.467,66.20000000000002),z.bezierCurveTo(69.401,66.32200000000002,69.32,66.50700000000002,69.375,66.69000000000001),z.bezierCurveTo(69.433,66.88100000000001,69.593,66.96600000000001,69.748,67.049),z.bezierCurveTo(69.811,67.08200000000001,69.884,67.12,69.958,67.17200000000001),z.bezierCurveTo(71.008,67.89800000000001,71.94,68.57700000000001,72.807,69.24700000000001),z.lineTo(72.989,69.38800000000002),z.lineTo(90.34,50.67),z.bezierCurveTo(90.533,50.461,90.533,50.461,89.19,49.064),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle=l.filter_outer,z.beginPath(),z.moveTo(59.319,45.7),z.bezierCurveTo(54.064,43.752,47.705,45.392,44.246,49.882000000000005),z.bezierCurveTo(41.502,53.443000000000005,40.531000000000006,58.044000000000004,41.937000000000005,62.36800000000001),z.bezierCurveTo(43.072,65.858,45.587,68.697,48.867000000000004,70.31800000000001),z.bezierCurveTo(57.025000000000006,74.27300000000001,67.32400000000001,68.647,68.009,59.48700000000001),z.bezierCurveTo(68.551,53.523,64.94,47.785,59.319,45.7),z.closePath(),z.moveTo(54.674,69.655),z.bezierCurveTo(48.955,69.655,44.319,65.019,44.319,59.299),z.bezierCurveTo(44.319,53.57899999999999,48.956,48.942,54.67400000000001,48.942),z.bezierCurveTo(60.39500000000001,48.942,65.03200000000001,53.578,65.03200000000001,59.299),z.bezierCurveTo(65.03200000000001,65.02,60.395,69.655,54.674,69.655),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle="#ffffff",z.beginPath(),z.moveTo(30.246,7.862),z.bezierCurveTo(30.648999999999997,6.814,31.064,5.83,31.485999999999997,4.895),z.bezierCurveTo(23.045,8.09,16.664,15.472,14.877,24.51),z.lineTo(26.007,24.51),z.bezierCurveTo(26.729,19.429,28.153,13.303,30.246,7.862),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle="#ffffff",z.beginPath(),z.moveTo(33.317,52.368),z.bezierCurveTo(30.155,47.878,27.782,42.861000000000004,26.508,38.194),z.lineTo(15.78,38.194),z.bezierCurveTo(18.813,47.126000000000005,26.476999999999997,53.912000000000006,35.917,55.696),z.bezierCurveTo(34.901,54.512,34.019,53.365,33.317,52.368),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle="#404041",z.beginPath(),z.moveTo(54.674,51.679),z.bezierCurveTo(50.473,51.679,47.055,55.098,47.055,59.299),z.bezierCurveTo(47.055,63.5,50.473,66.919,54.674,66.919),z.bezierCurveTo(58.877,66.919,62.296,63.5,62.296,59.299),z.bezierCurveTo(62.296,55.098,58.877,51.679,54.674,51.679),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.beginPath(),z.moveTo(54.674,51.679),z.bezierCurveTo(58.877,51.679,62.296,55.098,62.296,59.299),z.bezierCurveTo(62.296,63.5,58.877,66.919,54.674,66.919),z.bezierCurveTo(50.473,66.919,47.055,63.5,47.055,59.299),z.bezierCurveTo(47.055,55.098,50.473,51.679,54.674,51.679),z.moveTo(54.674,48.942),z.bezierCurveTo(48.955,48.942,44.319,53.578,44.319,59.299),z.bezierCurveTo(44.319,65.02,48.956,69.655,54.67400000000001,69.655),z.bezierCurveTo(60.39500000000001,69.655,65.03200000000001,65.019,65.03200000000001,59.299),z.bezierCurveTo(65.03200000000001,53.57899999999999,60.395,48.942,54.674,48.942),z.lineTo(54.674,48.942),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.beginPath(),z.moveTo(102.375,50.412),z.bezierCurveTo(100.038,48.244,97.813,45.833,94.297,46.168),z.bezierCurveTo(93.654,46.229,93.727,46.278,93.333,45.855),z.bezierCurveTo(92.91499999999999,45.406,92.497,44.956999999999994,92.079,44.507999999999996),z.bezierCurveTo(91.14399999999999,43.504999999999995,90.21,42.501,89.27499999999999,41.498),z.bezierCurveTo(87.40499999999999,39.489999999999995,85.285,37.414,84.6,34.659),z.bezierCurveTo(84.339,33.615,84.53399999999999,32.428,84.496,31.358999999999998),z.bezierCurveTo(84.41,28.958,84.148,26.563,83.69699999999999,24.203),z.bezierCurveTo(81.90399999999998,14.838999999999999,77.01399999999998,6.3629999999999995,69.93599999999999,-.004999999999999005),z.bezierCurveTo(66.68299999999999,-2.930999999999999,63.01499999999999,-5.451999999999999,59.07699999999999,-7.364999999999999),z.bezierCurveTo(55.62399999999999,-9.043,52.15999999999999,-10.506,48.23199999999999,-10.174999999999999),z.bezierCurveTo(42.794,-9.717,35.663,-2.35,35.811,-2.544),z.bezierCurveTo(21.9,-.373,10.877,10.625,8.66,24.523),z.bezierCurveTo(6.767,24.666999999999998,5.289,26.294,5.289,28.186),z.lineTo(5.289,34.539),z.bezierCurveTo(5.289,36.528,6.946999999999999,38.195,8.937999999999999,38.195),z.bezierCurveTo(9.086999999999998,38.2,9.236999999999998,38.195,9.386,38.195),z.bezierCurveTo(12.908,51.197,24.289,60.994,38.095,62.159),z.bezierCurveTo(38.089,62.137,38.085,62.112,38.08,62.089),z.bezierCurveTo(38.835,65.339,40.534,68.343,42.967999999999996,70.646),z.bezierCurveTo(45.924,73.443,49.842999999999996,75.116,53.907999999999994,75.295),z.bezierCurveTo(56.33899999999999,75.403,58.782,74.987,61.03399999999999,74.071),z.bezierCurveTo(62.09899999999999,73.637,63.11899999999999,73.096,64.07499999999999,72.458),z.bezierCurveTo(64.54999999999998,72.142,65.00999999999999,71.8,65.451,71.437),z.bezierCurveTo(65.672,71.256,65.88799999999999,71.07,66.098,70.878),z.bezierCurveTo(66.48,71.131,66.86,71.389,67.236,71.65),z.bezierCurveTo(67.77000000000001,72.021,68.298,72.402,68.82300000000001,72.789),z.bezierCurveTo(68.74100000000001,73.398,68.73,74.013,68.802,74.622),z.bezierCurveTo(68.947,75.853,69.405,77.039,70.132,78.044),z.bezierCurveTo(70.92,79.12899999999999,72.046,80.009,73.025,80.916),z.bezierCurveTo(74.37100000000001,82.16499999999999,75.82300000000001,83.122,77.69600000000001,83.343),z.bezierCurveTo(79.99300000000001,83.61500000000001,82.34300000000002,82.757,83.91700000000002,81.061),z.bezierCurveTo(86.52300000000001,78.24900000000001,89.13000000000001,75.43700000000001,91.73500000000001,72.626),z.bezierCurveTo(94.80000000000001,69.319,97.86600000000001,66.01400000000001,100.93,62.70700000000001),z.lineTo(102.76100000000001,60.732000000000006),z.bezierCurveTo(105.468,57.814,105.296,53.117,102.375,50.412),z.closePath(),z.moveTo(31.473,4.901),z.bezierCurveTo(30.081,7.968999999999999,28.997999999999998,11.184999999999999,28.11,14.418),z.bezierCurveTo(27.408,16.977999999999998,26.828,19.573,26.375,22.188),z.bezierCurveTo(26.333,22.429,26.076,24.509,25.968,24.509),z.lineTo(14.878,24.509),z.bezierCurveTo(16.662,15.478,23.038,8.1,31.473,4.901),z.closePath(),z.moveTo(8.903,24.513),z.bezierCurveTo(8.915000000000001,24.513,8.926,24.51,8.939,24.51),z.lineTo(9.069,24.51),z.bezierCurveTo(9.014,24.51,8.957,24.511,8.903,24.513),z.closePath(),z.moveTo(15.778,38.194),z.lineTo(26.354,38.194),z.bezierCurveTo(26.755,38.194,26.828,39.303000000000004,26.932,39.633),z.bezierCurveTo(27.730999999999998,42.162000000000006,28.779999999999998,44.612,30.012,46.959),z.bezierCurveTo(31.249000000000002,49.313,32.674,51.574000000000005,34.285,53.691),z.bezierCurveTo(34.827999999999996,54.404,35.937999999999995,55.722,35.916999999999994,55.697),z.bezierCurveTo(26.477,53.915,18.811,47.127,15.778,38.194),z.closePath(),z.moveTo(68.01,59.487),z.bezierCurveTo(67.324,68.647,57.026,74.273,48.86800000000001,70.318),z.bezierCurveTo(45.58900000000001,68.697,43.07300000000001,65.858,41.93800000000001,62.367999999999995),z.bezierCurveTo(40.53200000000001,58.044,41.50200000000001,53.443,44.24700000000001,49.88199999999999),z.bezierCurveTo(47.70600000000001,45.39199999999999,54.06400000000001,43.75199999999999,59.32000000000001,45.69999999999999),z.bezierCurveTo(64.94,47.785,68.551,53.523,68.01,59.487),z.closePath(),z.moveTo(72.959,69.05),z.bezierCurveTo(72.027,68.329,71.069,67.637,70.10000000000001,66.966),z.bezierCurveTo(69.75300000000001,66.72699999999999,69.45700000000001,66.74199999999999,69.686,66.318),z.bezierCurveTo(69.83000000000001,66.05,69.96600000000001,65.78,70.09700000000001,65.506),z.bezierCurveTo(70.40100000000001,64.86,70.665,64.198,70.88600000000001,63.521),z.bezierCurveTo(71.65,61.184,71.891,58.687,71.60100000000001,56.248000000000005),z.bezierCurveTo(71.12400000000001,52.230000000000004,69.18200000000002,48.464000000000006,66.20600000000002,45.727000000000004),z.bezierCurveTo(59.774000000000015,39.80800000000001,49.59800000000001,39.797000000000004,43.16200000000002,45.727000000000004),z.bezierCurveTo(41.51500000000002,47.246,40.16700000000002,49.088,39.22300000000002,51.121),z.bezierCurveTo(36.16900000000002,47.286,33.72900000000002,42.862,32.21200000000002,38.196),z.bezierCurveTo(33.106000000000016,38.196,33.97000000000002,38.224,34.795000000000016,37.809),z.bezierCurveTo(35.859000000000016,37.274,36.616000000000014,36.224,36.77600000000002,35.041),z.bezierCurveTo(36.960000000000015,33.69799999999999,36.80900000000002,32.254,36.80900000000002,30.903),z.bezierCurveTo(36.80900000000002,29.531,37.06000000000002,27.793,36.42200000000002,26.526999999999997),z.bezierCurveTo(35.42200000000002,24.535999999999998,33.460000000000015,24.510999999999996,31.532000000000018,24.510999999999996),z.bezierCurveTo(32.68300000000002,16.986999999999995,34.78400000000002,9.093999999999996,38.88800000000002,2.6089999999999947),z.bezierCurveTo(40.62000000000002,-.12600000000000522,42.90200000000002,-2.7960000000000056,45.96500000000002,-4.053000000000005),z.bezierCurveTo(47.515000000000015,-4.689000000000005,49.20000000000002,-4.891000000000005,50.859000000000016,-4.6520000000000055),z.bezierCurveTo(52.56200000000002,-4.407000000000005,53.94100000000002,-3.6340000000000057,55.496000000000016,-2.9850000000000056),z.bezierCurveTo(63.63,.41,70.734,7.203,74.775,14.964),z.bezierCurveTo(72.285,11.67,69.132,8.516,65.217,7),z.bezierCurveTo(61.449,5.541,57.194,6.125,54.059,8.706),z.bezierCurveTo(47.672,13.963,49.882999999999996,23.686,52.809999999999995,30.198),z.bezierCurveTo(54.949999999999996,34.96,60.019999999999996,37.24,65.089,36.669),z.bezierCurveTo(71.465,35.952,77.485,30.897999999999996,78.132,24.309999999999995),z.bezierCurveTo(78.70700000000001,26.976999999999997,79.006,29.699999999999996,79.049,32.42699999999999),z.bezierCurveTo(79.05900000000001,33.05899999999999,78.977,33.68699999999999,79.01700000000001,34.31799999999999),z.bezierCurveTo(79.24000000000001,37.75599999999999,81.34,40.91999999999999,83.561,43.41199999999999),z.bezierCurveTo(85.24900000000001,45.30499999999999,87.033,47.12199999999999,88.76100000000001,48.97699999999999),z.bezierCurveTo(88.98100000000001,49.21199999999999,90.19900000000001,50.45499999999999,90.15700000000001,50.49999999999999),z.bezierCurveTo(89.59100000000001,51.11099999999999,89.02300000000001,51.721999999999994,88.45700000000001,52.33299999999999),z.bezierCurveTo(83.291,57.905,78.125,63.479,72.959,69.05),z.closePath(),z.moveTo(68.899,31.704),z.bezierCurveTo(65.338,33.626,60.259,33.83,57.346000000000004,30.613),z.bezierCurveTo(56.151,29.294,55.54900000000001,27.419999999999998,54.989000000000004,25.77),z.bezierCurveTo(53.187000000000005,20.47,52.13700000000001,12.107,59.075,10.100999999999999),z.bezierCurveTo(64.58500000000001,8.507,69.517,13.899999999999999,72.38300000000001,17.889),z.bezierCurveTo(73.44500000000001,19.369,74.40400000000001,20.805999999999997,74.53600000000002,22.695),z.bezierCurveTo(74.805,26.517,72.127,29.964,68.899,31.704),z.closePath(),z.moveTo(96.994,58.903),z.bezierCurveTo(95.297,60.734,93.599,62.564,91.902,64.394),z.lineTo(81.098,76.048),z.bezierCurveTo(80.142,77.08,78.824,78.827,77.30799999999999,77.422),z.bezierCurveTo(76.54799999999999,76.718,75.78899999999999,76.014,75.02999999999999,75.309),z.bezierCurveTo(73.63299999999998,74.012,74.44099999999999,72.819,75.47899999999998,71.699),z.bezierCurveTo(78.03099999999999,68.946,80.58299999999998,66.193,83.13599999999998,63.439),z.bezierCurveTo(86.25699999999998,60.074,89.37599999999998,56.708,92.49699999999999,53.341),z.bezierCurveTo(93.33699999999999,52.435,94.23399999999998,51.146,95.66999999999999,51.784),z.bezierCurveTo(96.41599999999998,52.116,97.02399999999999,52.916,97.61699999999999,53.466),z.bezierCurveTo(98.3,54.1,99.231,54.723,99.231,55.759),z.bezierCurveTo(99.241,56.955,97.728,58.111,96.994,58.903),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle=l.filter_outer,z.beginPath(),z.moveTo(99.232,55.745),z.bezierCurveTo(99.241,56.94,97.728,58.096999999999994,96.994,58.888999999999996),z.bezierCurveTo(95.297,60.72,93.599,62.550999999999995,91.902,64.381),z.bezierCurveTo(88.3,68.265,84.7,72.15,81.098,76.033),z.bezierCurveTo(80.142,77.065,78.824,78.813,77.30799999999999,77.407),z.bezierCurveTo(76.54799999999999,76.704,75.78899999999999,75.999,75.02999999999999,75.294),z.bezierCurveTo(73.63299999999998,73.99799999999999,74.44099999999999,72.804,75.47899999999998,71.685),z.bezierCurveTo(78.03099999999999,68.932,80.58299999999998,66.179,83.13599999999998,63.425000000000004),z.bezierCurveTo(86.25699999999998,60.059000000000005,89.37599999999998,56.694,92.49699999999999,53.32600000000001),z.bezierCurveTo(93.33699999999999,52.42100000000001,94.23399999999998,51.13100000000001,95.66999999999999,51.769000000000005),z.bezierCurveTo(96.41599999999998,52.102000000000004,97.02399999999999,52.901,97.61699999999999,53.452000000000005),z.bezierCurveTo(98.301,54.085,99.232,54.708,99.232,55.745),z.closePath(),z.fill(),z.stroke(),z.restore(),z.save(),z.fillStyle=l.eyes,z.beginPath(),z.moveTo(68.899,31.704),z.bezierCurveTo(65.338,33.626,60.259,33.83,57.346000000000004,30.613),z.bezierCurveTo(56.151,29.294,55.54900000000001,27.419999999999998,54.989000000000004,25.77),z.bezierCurveTo(53.187000000000005,20.47,52.13700000000001,12.107,59.075,10.100999999999999),z.bezierCurveTo(64.58500000000001,8.507,69.517,13.899999999999999,72.38300000000001,17.889),z.bezierCurveTo(73.44500000000001,19.369,74.40400000000001,20.805999999999997,74.53600000000002,22.695),z.bezierCurveTo(74.805,26.517,72.127,29.964,68.899,31.704),z.closePath(),z.fill(),z.stroke(),z.restore(),z.restore(),z.restore()},u.setDirty=function(){i[this.versionName].dirty=!0},u.getBaseWidth=function(){return 115},u.getBaseHeight=function(){return 120},u.getDrawOffsetX=function(){return 2},u.getDrawOffsetY=function(){return 2},u.getScale=function(){return.2},GameInventoryManager&&GameInventoryManager.register("gas_mask",e),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.Gas_Mask=e)}();