!function(){"use strict";function e(e){this.drawAngle=0,this.colors=e,this.createVersion()}var r=GameInventoryManager.HeadClass,o={},i=0,T=0,v=e.prototype=new r;v.versionName="",v.dirty=!0,v.cache=function(e){var r=o[this.versionName];r.dirty=!1;var v=100*(e=Math.max(e,1))*.18,u=90*e*.18,b=r.canvas;b.width=v,b.height=u,i=b.width/2,T=b.height/2;var C=b.getContext("2d"),l=.18*e,z=this.colors;C.scale(l,l),C.save(),C.translate(0,0),C.beginPath(),C.moveTo(0,0),C.lineTo(100,0),C.lineTo(100,89.25),C.lineTo(0,89.25),C.closePath(),C.clip(),C.translate(0,0),C.translate(0,0),C.scale(1,1),C.translate(0,0),C.strokeStyle="rgba(0,0,0,0)",C.lineCap="butt",C.lineJoin="miter",C.miterLimit=4,C.save(),C.save(),C.fillStyle="#ffffff",C.beginPath(),C.moveTo(70.969,46.519),C.bezierCurveTo(70.856,47.207,70.666,48.353,70.594,48.792),C.bezierCurveTo(69.51299999999999,57.012,63.17099999999999,58.027,59.75699999999999,58.573),C.bezierCurveTo(53.19599999999999,59.621,50.02699999999999,54.619,48.32499999999999,51.931),C.bezierCurveTo(48.20299999999999,51.739999999999995,48.07999999999999,51.546,47.95699999999999,51.355),C.bezierCurveTo(47.80099999999999,51.113,47.700999999999986,50.916999999999994,47.64799999999999,50.814),C.bezierCurveTo(46.77099999999999,49.104,45.62099999999999,49.288,45.24299999999999,49.348),C.lineTo(45.15999999999999,49.362),C.lineTo(45.09899999999999,49.373000000000005),C.lineTo(37.38899999999999,50.604000000000006),C.bezierCurveTo(36.66699999999999,50.825,35.31799999999999,51.43500000000001,35.249999999999986,52.919000000000004),C.bezierCurveTo(35.179999999999986,56.004000000000005,33.70999999999999,61.58500000000001,29.013999999999985,64.781),C.bezierCurveTo(34.43099999999998,74.046,45.14299999999999,79.518,56.378999999999984,77.72200000000001),C.bezierCurveTo(70.99399999999999,75.38700000000001,80.94599999999998,61.647000000000006,78.61099999999999,47.03300000000001),C.bezierCurveTo(78.52,46.464000000000006,78.40499999999999,45.90500000000001,78.27999999999999,45.34900000000001),C.lineTo(70.969,46.519),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle=z.helmet,C.beginPath(),C.moveTo(44.642,7.971),C.bezierCurveTo(25.46,10.962,1.457,21.587,14.998,54.005),C.lineTo(16.125,58.283),C.bezierCurveTo(17.197,62.706,23.543,61.281,23.543,61.281),C.bezierCurveTo(29.61,59.613,29.717,52.76,29.717,52.76),C.bezierCurveTo(29.927,46.601,36.224,45.184,36.224,45.184),C.lineTo(44.166,43.913999999999994),C.bezierCurveTo(50.101,42.830999999999996,52.535999999999994,48.245999999999995,52.604,48.34199999999999),C.bezierCurveTo(54.265,50.92099999999999,55.662,53.61999999999999,58.884,53.10499999999999),C.bezierCurveTo(62.848,52.47199999999999,64.639,51.80199999999999,65.114,47.99699999999999),C.bezierCurveTo(65.117,47.97599999999999,65.595,45.080999999999996,65.595,45.080999999999996),C.bezierCurveTo(66.272,41.553999999999995,69.595,41.132999999999996,69.595,41.132999999999996),C.lineTo(84.412,38.76499999999999),C.bezierCurveTo(86.75500000000001,38.39099999999999,86.34,36.10499999999999,86.34,36.10499999999999),C.lineTo(86.132,34.80399999999999),C.bezierCurveTo(78.647,8.008,60.479,5.503,44.642,7.971),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.arc(59.256,47.486,1.549,0,6.283185307179586,!0),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.arc(23.148,55.472,1.549,0,6.283185307179586,!0),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle=z.helmet,C.transform(-.5224,-.8527,.8527,-.5224,20.9312,156.1675),C.beginPath(),C.moveTo(52.507,69.684),C.lineTo(55.891,69.684),C.quadraticCurveTo(55.891,69.684,55.891,69.684),C.lineTo(55.891,74.761),C.quadraticCurveTo(55.891,74.761,55.891,74.761),C.lineTo(52.507,74.761),C.quadraticCurveTo(52.507,74.761,52.507,74.761),C.lineTo(52.507,69.684),C.quadraticCurveTo(52.507,69.684,52.507,69.684),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(91.466,33.312),C.bezierCurveTo(87.64399999999999,19.629999999999995,80.746,10.253999999999998,70.96199999999999,5.442999999999998),C.bezierCurveTo(63.502,1.776,54.614,.812,43.789,2.5),C.lineTo(43.458,2.553),C.bezierCurveTo(31.729,4.427,16.26,9.332,9.17,22.054),C.bezierCurveTo(4.0889999999999995,31.174,4.28,42.518,9.739,55.78),C.lineTo(10.759,59.65),C.bezierCurveTo(12.049,64.838,16.85,67.628,23.125,66.934),C.bezierCurveTo(29.607,78.914,43.164,86.104,57.357,83.836),C.bezierCurveTo(58.453,83.661,59.527,83.431,60.579,83.154),C.bezierCurveTo(61.642,84.244,62.748,85.3,63.881,86.255),C.lineTo(64.04,86.377),C.bezierCurveTo(65.14,87.151,66.607,87.726,67.97800000000001,87.50699999999999),C.bezierCurveTo(68.51400000000001,87.42099999999999,69.03600000000002,87.21499999999999,69.51500000000001,86.85099999999998),C.bezierCurveTo(71.22500000000001,85.55099999999999,71.47300000000001,83.08299999999998,70.26500000000001,78.81899999999999),C.bezierCurveTo(80.76000000000002,71.89899999999999,86.83700000000002,59.255999999999986,84.72700000000002,46.057999999999986),C.bezierCurveTo(84.63700000000001,45.490999999999985,84.52800000000002,44.92899999999999,84.40900000000002,44.371999999999986),C.lineTo(85.28500000000003,44.23099999999999),C.bezierCurveTo(87.44700000000003,43.88499999999999,89.29300000000002,42.771999999999984,90.48200000000003,41.091999999999985),C.bezierCurveTo(92.18100000000003,38.695999999999984,91.94900000000003,36.09299999999998,91.80500000000002,35.20999999999999),C.lineTo(91.55000000000003,33.615999999999985),C.lineTo(91.466,33.312),C.closePath(),C.moveTo(53.453,74.663),C.lineTo(52.919000000000004,74.99199999999999),C.lineTo(51.151,72.106),C.lineTo(55.478,69.454),C.lineTo(57.247,72.338),C.lineTo(53.453,74.663),C.closePath(),C.moveTo(52.392,68.747),C.bezierCurveTo(46.332,65.688,39.341,61.889,33.848,58.843),C.bezierCurveTo(34.82,56.651,35.217999999999996,54.470000000000006,35.253,52.92),C.bezierCurveTo(35.321,51.436,36.67,50.825,37.392,50.605000000000004),C.lineTo(45.102000000000004,49.374),C.lineTo(45.163000000000004,49.363),C.lineTo(45.246,49.349),C.bezierCurveTo(45.624,49.288,46.773,49.105,47.651,50.815),C.bezierCurveTo(47.704,50.919,47.804,51.114,47.96,51.355999999999995),C.bezierCurveTo(48.084,51.547,48.207,51.74099999999999,48.328,51.931999999999995),C.bezierCurveTo(49.495000000000005,53.77499999999999,51.353,56.705999999999996,54.523,58.02799999999999),C.bezierCurveTo(53.73,61.7,52.925,65.636,52.392,68.747),C.closePath(),C.moveTo(29.017,64.782),C.bezierCurveTo(29.909,64.175,30.677,63.477999999999994,31.349,62.733),C.bezierCurveTo(36.627,65.66199999999999,43.341,69.319,49.325,72.366),C.bezierCurveTo(49.36,72.613,49.443000000000005,72.852,49.578,73.07),C.lineTo(51.346000000000004,75.954),C.bezierCurveTo(51.73800000000001,76.59599999999999,52.471000000000004,76.93299999999999,53.212,76.814),C.bezierCurveTo(53.451,76.776,53.678000000000004,76.692,53.885000000000005,76.565),C.lineTo(54.569,76.14699999999999),C.bezierCurveTo(54.969,76.66999999999999,55.409000000000006,77.22599999999998,55.864000000000004,77.794),C.bezierCurveTo(44.816,79.342,34.349,73.904,29.017,64.782),C.closePath(),C.moveTo(66.332,82.276),C.bezierCurveTo(66.03099999999999,82.012,65.73299999999999,81.738,65.43499999999999,81.458),C.bezierCurveTo(65.66199999999999,81.358,65.88399999999999,81.25,66.10799999999999,81.145),C.bezierCurveTo(66.212,81.592,66.286,81.969,66.332,82.276),C.closePath(),C.moveTo(78.613,47.034),C.bezierCurveTo(80.7,60.098,72.965,72.455,60.863,76.6),C.bezierCurveTo(60.009,75.592,59.211999999999996,74.603,58.505,73.68799999999999),C.bezierCurveTo(59.133,73.10199999999999,59.286,72.13399999999999,58.82,71.374),C.lineTo(57.105,68.577),C.bezierCurveTo(57.635999999999996,65.621,58.382999999999996,62.01,59.111,58.641),C.bezierCurveTo(59.326,58.62,59.535,58.608,59.757,58.573),C.bezierCurveTo(63.171,58.027,69.513,57.011,70.594,48.792),C.bezierCurveTo(70.66499999999999,48.353,70.856,47.206,70.969,46.519),C.lineTo(78.28399999999999,45.351),C.bezierCurveTo(78.409,45.906,78.522,46.465,78.613,47.034),C.closePath(),C.moveTo(86.34,36.104),C.bezierCurveTo(86.34,36.104,86.75500000000001,38.39,84.412,38.763999999999996),C.lineTo(69.595,41.132),C.bezierCurveTo(69.595,41.132,69.583,41.132999999999996,69.56,41.137),C.bezierCurveTo(69.20400000000001,41.195,66.23100000000001,41.766,65.595,45.08),C.bezierCurveTo(65.595,45.08,65.117,47.975,65.114,47.995999999999995),C.bezierCurveTo(64.70400000000001,51.278999999999996,63.312000000000005,52.227,60.395,52.833),C.bezierCurveTo(59.93,52.928999999999995,59.429,53.018,58.884,53.104),C.bezierCurveTo(58.592,53.152,58.321,53.165,58.057,53.159),C.bezierCurveTo(58.008,53.159,57.957,53.158,57.908,53.157),C.bezierCurveTo(57.651,53.141999999999996,57.404,53.111,57.171,53.053),C.bezierCurveTo(57.153999999999996,53.050999999999995,57.139,53.043,57.122,53.038),C.bezierCurveTo(56.622,52.909,56.173,52.684,55.763,52.388),C.lineTo(55.763,52.388),C.bezierCurveTo(54.504999999999995,51.475,53.601,49.888999999999996,52.604,48.341),C.bezierCurveTo(52.537,48.245000000000005,50.158,42.954,44.37,43.88),C.bezierCurveTo(44.303,43.89,44.235,43.901,44.166999999999994,43.913000000000004),C.lineTo(36.224999999999994,45.18300000000001),C.bezierCurveTo(36.224999999999994,45.18300000000001,29.927999999999994,46.60000000000001,29.717999999999996,52.75900000000001),C.bezierCurveTo(29.717999999999996,52.75900000000001,29.685999999999996,54.32200000000001,28.999999999999996,56.138000000000005),C.bezierCurveTo(28.763999999999996,56.763000000000005,28.297999999999995,57.78000000000001,27.319999999999997,58.958000000000006),C.bezierCurveTo(26.372999999999998,60.016000000000005,25.120999999999995,60.650000000000006,24.998999999999995,60.715),C.bezierCurveTo(23.611999999999995,61.449000000000005,22.317999999999994,61.486000000000004,20.822999999999993,61.484),C.bezierCurveTo(18.959999999999994,61.394,16.721999999999994,60.75,16.124999999999993,58.283),C.lineTo(14.997999999999992,54.005),C.bezierCurveTo(5.8,31.986,13.927,20.026,26.096,13.678),C.bezierCurveTo(26.386,15.404,28.01,16.573,29.738,16.296),C.bezierCurveTo(31.475,16.019,32.659,14.386,32.381,12.646999999999998),C.lineTo(32.129,11.069999999999999),C.bezierCurveTo(34.751,10.133999999999999,37.446,9.395999999999999,40.117,8.817999999999998),C.lineTo(40.666999999999994,12.259999999999998),C.bezierCurveTo(40.94499999999999,13.997999999999998,42.577999999999996,15.181999999999999,44.315,14.904999999999998),C.bezierCurveTo(46.052,14.626999999999997,47.236999999999995,12.993999999999998,46.958999999999996,11.255999999999997),C.lineTo(46.398999999999994,7.755999999999997),C.bezierCurveTo(46.397999999999996,7.7449999999999966,46.392999999999994,7.735999999999997,46.39099999999999,7.724999999999997),C.bezierCurveTo(49.16999999999999,7.364999999999997,52.00199999999999,7.175999999999997,54.82399999999999,7.260999999999997),C.lineTo(55.10499999999999,9.017999999999997),C.bezierCurveTo(55.38199999999999,10.755999999999997,57.01599999999999,11.938999999999997,58.75299999999999,11.661999999999997),C.bezierCurveTo(60.489999999999995,11.383999999999997,61.67399999999999,9.750999999999998,61.39699999999999,8.012999999999998),C.lineTo(61.39499999999999,8.003999999999998),C.bezierCurveTo(69.74699999999999,9.734999999999998,77.49599999999998,14.691999999999997,82.75599999999999,25.671),C.lineTo(79.65199999999999,26.166),C.bezierCurveTo(77.91399999999999,26.444,76.73199999999999,28.079,77.00899999999999,29.815),C.bezierCurveTo(77.28699999999999,31.553,78.91999999999999,32.736000000000004,80.65699999999998,32.459),C.lineTo(85.18299999999998,31.736000000000004),C.bezierCurveTo(85.51299999999998,32.726000000000006,85.83299999999998,33.739000000000004,86.13099999999997,34.804),C.lineTo(86.34,36.104),C.closePath(),C.fill(),C.stroke(),C.restore(),z.hasOwnProperty("skull")&&(C.save(),C.beginPath(),C.fillStyle=z.skull.outline,C.moveTo(53.222,25.522),C.bezierCurveTo(52.305,21.269,47.939,18.546999999999997,43.411,19.525999999999996),C.bezierCurveTo(38.884,20.501999999999995,35.966,24.792999999999996,36.884,29.045999999999996),C.bezierCurveTo(37.39,31.390999999999995,38.952,33.205,41.018,34.239),C.lineTo(41.756,38.087999999999994),C.lineTo(41.908,38.086999999999996),C.bezierCurveTo(42.99,38.086,43.876000000000005,38.083,44.627,38.06699999999999),C.lineTo(44.019000000000005,34.90599999999999),C.lineTo(45.419000000000004,34.983999999999995),C.lineTo(46.013000000000005,38.01299999999999),C.bezierCurveTo(46.95700000000001,37.94999999999999,47.66100000000001,37.82999999999999,48.36200000000001,37.59799999999999),C.lineTo(47.73000000000001,34.373999999999995),C.lineTo(49.04000000000001,33.888),C.lineTo(49.655000000000015,37.061),C.bezierCurveTo(50.277000000000015,36.758,50.987000000000016,36.366,51.90700000000002,35.857),C.lineTo(52.29900000000002,35.64),C.lineTo(51.59600000000002,31.956),C.bezierCurveTo(53.054,30.166,53.729,27.868,53.222,25.522),C.closePath(),C.moveTo(42.868,28.706),C.bezierCurveTo(42.737,28.105,42.159,27.705,41.544000000000004,27.804),C.bezierCurveTo(40.907000000000004,27.906,40.473000000000006,28.503999999999998,40.575,29.141),C.bezierCurveTo(40.621,29.427,40.767,29.671999999999997,40.972,29.845999999999997),C.bezierCurveTo(40.410000000000004,30.103999999999996,39.809000000000005,30.326999999999998,39.179,30.516),C.bezierCurveTo(36.499,24.259,42.614000000000004,24.36,44.212,27.252),C.bezierCurveTo(43.863,27.798,43.407,28.28,42.868,28.706),C.closePath(),C.moveTo(46.488,32.366),C.lineTo(45.264,32.662),C.bezierCurveTo(44.607,32.82,44.182,32.41,44.319,31.747999999999998),C.lineTo(44.798,29.438999999999997),C.bezierCurveTo(44.935,28.775999999999996,45.359,28.688999999999997,45.741,29.247999999999998),C.lineTo(46.986,31.063999999999997),C.bezierCurveTo(47.37,31.622,47.145,32.209,46.488,32.366),C.closePath(),C.moveTo(51.228,28.508),C.bezierCurveTo(50.537,28.486,49.865,28.441,49.224000000000004,28.358),C.bezierCurveTo(49.297000000000004,28.17,49.324000000000005,27.962,49.290000000000006,27.749000000000002),C.bezierCurveTo(49.18800000000001,27.112000000000002,48.589000000000006,26.679000000000002,47.953,26.781000000000002),C.bezierCurveTo(47.422000000000004,26.865000000000002,47.033,27.296000000000003,46.976000000000006,27.804000000000002),C.bezierCurveTo(46.416000000000004,27.576,45.913000000000004,27.277,45.48400000000001,26.883000000000003),C.bezierCurveTo(46.281,23.675,52.207,21.773,51.228,28.508),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle=z.skull.fill,C.beginPath(),C.moveTo(43.886,19.438),C.bezierCurveTo(48.24,18.743,52.337,21.418,53.222,25.523),C.bezierCurveTo(53.729,27.869,53.055,30.167,51.597,31.958),C.lineTo(52.300000000000004,35.641999999999996),C.lineTo(51.908,35.858999999999995),C.bezierCurveTo(50.988,36.367999999999995,50.278,36.76,49.656,37.062999999999995),C.lineTo(49.041,33.88999999999999),C.lineTo(47.730999999999995,34.37599999999999),C.lineTo(48.36299999999999,37.599999999999994),C.bezierCurveTo(47.97299999999999,37.72899999999999,47.58099999999999,37.82399999999999,47.14799999999999,37.892999999999994),C.bezierCurveTo(46.80299999999999,37.94799999999999,46.432999999999986,37.986999999999995,46.01399999999999,38.01499999999999),C.lineTo(45.41999999999999,34.98599999999999),C.lineTo(44.01999999999999,34.90799999999999),C.lineTo(44.627999999999986,38.06899999999999),C.bezierCurveTo(43.87699999999999,38.08499999999999,42.990999999999985,38.08799999999999,41.908999999999985,38.08899999999999),C.lineTo(41.756999999999984,38.08999999999999),C.lineTo(41.018999999999984,34.240999999999985),C.bezierCurveTo(38.95299999999998,33.20699999999999,37.390999999999984,31.391999999999985,36.884999999999984,29.047999999999988),C.bezierCurveTo(35.966999999999985,24.794999999999987,38.884999999999984,20.503999999999987,43.411999999999985,19.527999999999988),C.bezierCurveTo(43.57,19.491,43.728,19.463,43.886,19.438),C.moveTo(46.975,27.804),C.bezierCurveTo(47.032000000000004,27.294999999999998,47.421,26.865,47.952,26.781),C.bezierCurveTo(48.589,26.677999999999997,49.187,27.112,49.289,27.749),C.bezierCurveTo(49.323,27.962999999999997,49.296,28.171,49.223,28.357999999999997),C.bezierCurveTo(49.864,28.440999999999995,50.536,28.485999999999997,51.227,28.507999999999996),C.bezierCurveTo(51.757999999999996,24.857999999999997,50.26,23.742999999999995,48.648999999999994,23.999999999999996),C.bezierCurveTo(47.288999999999994,24.218999999999998,45.84799999999999,25.412999999999997,45.48199999999999,26.882999999999996),C.bezierCurveTo(45.912,27.276,46.415,27.576,46.975,27.804),C.moveTo(39.178,30.516),C.bezierCurveTo(39.809,30.328,40.41,30.104,40.971,29.845999999999997),C.bezierCurveTo(40.766,29.671999999999997,40.62,29.426999999999996,40.574,29.141),C.bezierCurveTo(40.472,28.503999999999998,40.906,27.906,41.543,27.804),C.bezierCurveTo(42.158,27.705,42.736,28.105999999999998,42.867,28.706),C.bezierCurveTo(43.406,28.28,43.863,27.798,44.209999999999994,27.252),C.bezierCurveTo(43.468999999999994,25.909,41.75299999999999,25.168,40.39699999999999,25.384999999999998),C.bezierCurveTo(38.832,25.635,37.742,27.163,39.178,30.516),C.moveTo(45.167,32.682),C.bezierCurveTo(45.199,32.677,45.231,32.672000000000004,45.265,32.662),C.lineTo(46.489,32.366),C.bezierCurveTo(47.146,32.209,47.37,31.622,46.988,31.064),C.lineTo(45.743,29.248),C.bezierCurveTo(45.556000000000004,28.975,45.359,28.855,45.191,28.883000000000003),C.bezierCurveTo(45.015,28.911,44.870000000000005,29.099000000000004,44.800000000000004,29.44),C.lineTo(44.321000000000005,31.749000000000002),C.bezierCurveTo(44.19,32.376,44.566,32.778,45.167,32.682),C.moveTo(43.622,17.788),C.bezierCurveTo(43.434,17.816,43.247,17.851,43.059,17.893),C.bezierCurveTo(40.452999999999996,18.455000000000002,38.205,19.954,36.727,22.114),C.bezierCurveTo(35.233,24.299,34.708,26.885,35.25,29.398),C.bezierCurveTo(35.78,31.854,37.319,33.971000000000004,39.524,35.319),C.lineTo(40.115,38.402),C.lineTo(40.377,39.768),C.lineTo(41.919000000000004,39.757),C.bezierCurveTo(42.998000000000005,39.756,43.891000000000005,39.754,44.648,39.736),C.bezierCurveTo(44.648,39.736,46.705000000000005,39.757,48.393,39.331999999999994),C.bezierCurveTo(48.393,39.331999999999994,49.586,39.14399999999999,52.716,37.31799999999999),C.lineTo(54.167,36.51399999999999),C.lineTo(53.941,35.32699999999999),C.lineTo(53.376000000000005,32.36399999999999),C.bezierCurveTo(54.851000000000006,30.22199999999999,55.389,27.63899999999999,54.855000000000004,25.16699999999999),C.bezierCurveTo(53.782,20.194,48.848,16.952,43.622,17.788),C.lineTo(43.622,17.788),C.closePath(),C.fill(),C.stroke(),C.restore()),C.restore(),C.restore()},v.getVersions=function(){return o},v.getBaseWidth=function(){return 100},v.getBaseHeight=function(){return 90},v.getDrawOffsetX=function(){return 0},v.getDrawOffsetY=function(){return-1},v.getScale=function(){return.18},GameInventoryManager&&GameInventoryManager.register("bmx_helmet",e),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.BMX_Helmet=e)}();