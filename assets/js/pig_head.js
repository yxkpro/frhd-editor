!function(){"use strict";function e(e){this.drawAngle=0,this.colors=e,this.createVersion()}var r=GameInventoryManager.HeadClass,o={},i=0,v=0,T=e.prototype=new r;T.versionName="",T.dirty=!0,T.cache=function(e){var r=o[this.versionName];r.dirty=!1;var T=105*(e=Math.max(e,1))*.18,u=102*e*.18,b=r.canvas;b.width=T,b.height=u,i=b.width/2,v=b.height/2;var C=b.getContext("2d"),z=.18*e,t=this.colors;C.save(),C.scale(z,z),C.save(),C.translate(0,0),C.beginPath(),C.moveTo(0,0),C.lineTo(103.421,0),C.lineTo(103.421,101.644),C.lineTo(0,101.644),C.closePath(),C.clip(),C.translate(0,0),C.translate(0,0),C.scale(1,1),C.translate(-3.279,14.237),C.strokeStyle="rgba(0,0,0,0)",C.lineCap="butt",C.lineJoin="miter",C.miterLimit=4,C.save(),C.fillStyle=t.skin,C.beginPath(),C.moveTo(84.797,56.427),C.bezierCurveTo(84.7,56.432,84.61,56.436,84.524,56.445),C.bezierCurveTo(84.524,56.445,76.099,55.414,72.005,53.915),C.bezierCurveTo(72.005,53.915,65.095,52.254,61.102999999999994,55.16),C.bezierCurveTo(61.102999999999994,55.16,69.61099999999999,64.717,80.627,62.309),C.bezierCurveTo(80.627,62.309,85.157,62.355,84.45599999999999,65.51299999999999),C.bezierCurveTo(84.45599999999999,65.51299999999999,84.48499999999999,69.23899999999999,77.08099999999999,70.398),C.bezierCurveTo(77.08099999999999,70.398,60.31999999999999,71.80799999999999,57.718999999999994,79.294),C.bezierCurveTo(57.718999999999994,79.294,56.977999999999994,84.252,49.757999999999996,84.38199999999999),C.bezierCurveTo(38.254999999999995,84.59199999999998,16.264999999999993,77.31599999999999,11.525999999999996,70.883),C.bezierCurveTo(11.525999999999996,70.883,16.606999999999996,64.64,14.651999999999996,50.992999999999995),C.bezierCurveTo(12.697999999999995,37.343999999999994,12.553999999999995,25.913999999999994,20.099999999999994,18.630999999999993),C.bezierCurveTo(20.099999999999994,18.630999999999993,8.967999999999995,13.079999999999993,9.772999999999994,-4.874000000000006),C.bezierCurveTo(9.772999999999994,-4.874000000000006,18.834999999999994,-2.9690000000000056,22.881999999999994,-3.153000000000006),C.bezierCurveTo(22.881999999999994,-3.153000000000006,35.343999999999994,-2.8510000000000058,39.35799999999999,5.838999999999995),C.bezierCurveTo(39.35799999999999,5.838999999999995,41.00399999999999,5.155999999999995,43.32299999999999,4.537999999999995),C.bezierCurveTo(43.32299999999999,4.537999999999995,41.047999999999995,-5.119000000000005,48.63099999999999,-10.436000000000005),C.bezierCurveTo(48.63099999999999,-10.436000000000005,50.977999999999994,-5.635000000000005,54.67799999999999,-2.2320000000000046),C.bezierCurveTo(54.67799999999999,-2.2320000000000046,59.42799999999999,.28899999999999526,59.69599999999999,4.519999999999995),C.lineTo(76.597,18.12),C.bezierCurveTo(76.597,18.12,80.42599999999999,21.155,78.893,26.227),C.bezierCurveTo(78.893,26.227,81.892,27.278,83.611,29.996000000000002),C.bezierCurveTo(83.611,29.996000000000002,87.95,31.022000000000002,89.412,33.289),C.bezierCurveTo(89.412,33.289,91.274,35.742000000000004,95.602,35.279),C.bezierCurveTo(95.602,35.279,95.86500000000001,35.377,96.265,35.598000000000006),C.lineTo(96.18,35.648),C.bezierCurveTo(96.18,35.648,94.28800000000001,35.673,92.129,41.138000000000005),C.bezierCurveTo(92.129,41.138000000000005,89.43900000000001,46.398,86.20100000000001,48.46300000000001),C.bezierCurveTo(86.202,48.464,79.855,52.302,84.797,56.427),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle="#bd579f",C.beginPath(),C.moveTo(96.276,35.607),C.bezierCurveTo(97.91799999999999,36.521,101.82,39.510999999999996,99.563,46.442),C.bezierCurveTo(96.74600000000001,55.089,93.431,57.028999999999996,88.194,56.66),C.bezierCurveTo(88.194,56.66,86.169,56.358999999999995,84.797,56.425999999999995),C.bezierCurveTo(79.856,52.300999999999995,86.202,48.462999999999994,86.202,48.462999999999994),C.bezierCurveTo(89.439,46.397999999999996,92.13,41.13799999999999,92.13,41.13799999999999),C.bezierCurveTo(94.289,35.67299999999999,96.181,35.64799999999999,96.181,35.64799999999999),C.lineTo(96.276,35.607),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle="#b82041",C.beginPath(),C.moveTo(81.115,62.343),C.bezierCurveTo(80.81899999999999,62.314,80.627,62.309000000000005,80.627,62.309000000000005),C.bezierCurveTo(69.61,64.71600000000001,61.102999999999994,55.160000000000004,61.102999999999994,55.160000000000004),C.bezierCurveTo(65.095,52.254000000000005,72.005,53.915000000000006,72.005,53.915000000000006),C.bezierCurveTo(73.18299999999999,54.34700000000001,74.71799999999999,54.73800000000001,76.31,55.081),C.bezierCurveTo(76.47500000000001,58.455000000000005,81.171,62.256,81.171,62.256),C.lineTo(81.115,62.343),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle="#bd579f",C.beginPath(),C.moveTo(14.185,1.093),C.bezierCurveTo(14.185,1.093,20.43,2.292,26.136000000000003,3.134),C.bezierCurveTo(32.193000000000005,4.026,34.277,7.314,35.218,13.019),C.bezierCurveTo(35.218,13.019,30.199000000000005,14.587,26.893000000000004,16.958),C.bezierCurveTo(26.893000000000004,16.958,25.026000000000003,16.052999999999997,23.577000000000005,15.521999999999998),C.bezierCurveTo(22.13,14.992,14.208,9.569,14.185,1.093),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(15.19,2.27),C.bezierCurveTo(15.475999999999999,5.038,16.651,7.606999999999999,18.346,9.794),C.bezierCurveTo(19.573,11.377,21.051000000000002,12.81,22.71,13.938),C.bezierCurveTo(23.46,14.448,24.242,14.748000000000001,25.075000000000003,15.098),C.bezierCurveTo(25.574,15.307,26.465000000000003,15.896,26.931000000000004,15.785),C.bezierCurveTo(27.279000000000003,15.702,27.710000000000004,15.293,28.027000000000005,15.112),C.bezierCurveTo(29.049000000000003,14.529,30.107000000000006,14.001,31.190000000000005,13.54),C.bezierCurveTo(31.829000000000004,13.267999999999999,32.470000000000006,13.001999999999999,33.11900000000001,12.755999999999998),C.bezierCurveTo(33.342000000000006,12.671999999999999,33.65800000000001,12.614999999999998,33.855000000000004,12.483999999999998),C.bezierCurveTo(34.18300000000001,12.264999999999999,34.13100000000001,12.302999999999999,34.033,11.865999999999998),C.bezierCurveTo(33.658,10.187999999999999,33.128,8.510999999999997,32.068,7.128999999999998),C.bezierCurveTo(31.083,5.841,29.66,5.01,28.126,4.54),C.bezierCurveTo(25.203000000000003,3.645,21.979,3.4530000000000003,18.975,2.9299999999999997),C.bezierCurveTo(17.764,2.719,16.372,2.288,15.19,2.27),C.closePath(),C.moveTo(14.64,.215),C.bezierCurveTo(18.303,.9199999999999999,21.984,1.55,25.673000000000002,2.105),C.bezierCurveTo(27.872,2.437,30.05,2.941,31.866,4.2940000000000005),C.bezierCurveTo(33.43,5.460000000000001,34.487,7.105,35.161,8.916),C.bezierCurveTo(35.531,9.91,35.797000000000004,10.946,35.995000000000005,11.987),C.bezierCurveTo(36.044000000000004,12.247,36.091,12.507,36.135000000000005,12.768),C.bezierCurveTo(36.18300000000001,13.056000000000001,36.232000000000006,13.345,36.28000000000001,13.633000000000001),C.bezierCurveTo(36.29700000000001,13.733,35.61200000000001,13.888000000000002,35.49500000000001,13.925),C.bezierCurveTo(34.96400000000001,14.093,34.439000000000014,14.283000000000001,33.91700000000001,14.479000000000001),C.bezierCurveTo(31.88800000000001,15.24,29.869000000000007,16.132,28.04800000000001,17.319000000000003),C.bezierCurveTo(27.89500000000001,17.419000000000004,27.74400000000001,17.520000000000003,27.59300000000001,17.624000000000002),C.bezierCurveTo(27.00900000000001,18.026000000000003,27.00000000000001,18.062,26.35200000000001,17.751),C.bezierCurveTo(25.73300000000001,17.455000000000002,25.10800000000001,17.17,24.47700000000001,16.902),C.bezierCurveTo(23.62500000000001,16.541,22.78700000000001,16.240000000000002,22.00200000000001,15.744000000000002),C.bezierCurveTo(18.92100000000001,13.794000000000002,16.29200000000001,10.831000000000001,14.72900000000001,7.533000000000001),C.bezierCurveTo(14.20300000000001,6.421000000000001,13.801000000000009,5.253000000000002,13.548000000000009,4.049000000000001),C.bezierCurveTo(13.41200000000001,3.4030000000000014,13.325000000000008,2.7500000000000013,13.27200000000001,2.0920000000000014),C.bezierCurveTo(13.24500000000001,1.7480000000000016,13.23600000000001,1.4010000000000016,13.234000000000009,1.0560000000000014),C.bezierCurveTo(13.234000000000009,.9190000000000014,13.12400000000001,-.07299999999999862,13.349000000000009,-.029999999999998694),C.bezierCurveTo(13.78,.052,14.21,.133,14.64,.215),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle="#ffffff",C.beginPath(),C.moveTo(42.844,25.938),C.bezierCurveTo(42.844,25.938,48.749,19.915,56.355000000000004,22.195999999999998),C.bezierCurveTo(56.355000000000004,22.195999999999998,63.778000000000006,24.110999999999997,64.274,30.86),C.bezierCurveTo(64.274,30.86,60.928,31.098,59.093,31.512999999999998),C.bezierCurveTo(59.094,31.513,48.715,34.104,42.844,25.938),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(52.778,22.945),C.bezierCurveTo(49.747,22.983,46.939,24.266000000000002,44.575,26.096),C.bezierCurveTo(46.818000000000005,28.725,50.031000000000006,30.188,53.435,30.545),C.bezierCurveTo(56.633,30.881,59.663000000000004,29.995,62.823,29.717000000000002),C.bezierCurveTo(61.762,25.413,56.939,22.945,52.778,22.945),C.bezierCurveTo(52.302,22.951,52.851,22.945,52.778,22.945),C.closePath(),C.moveTo(52.936,20.417),C.bezierCurveTo(56.482,20.452,60.107,21.899,62.616,24.429000000000002),C.bezierCurveTo(64.73,26.561000000000003,65.408,29.128,65.633,32.025000000000006),C.bezierCurveTo(63.709999999999994,32.17700000000001,61.775,32.297000000000004,59.873999999999995,32.647000000000006),C.bezierCurveTo(58.17699999999999,32.94500000000001,56.528999999999996,33.205000000000005,54.794999999999995,33.165000000000006),C.bezierCurveTo(51.00999999999999,33.077000000000005,47.24099999999999,31.904000000000007,44.334999999999994,29.423000000000005),C.bezierCurveTo(43.23199999999999,28.482000000000006,42.330999999999996,27.381000000000007,41.48199999999999,26.213000000000005),C.bezierCurveTo(41.17499999999999,25.791000000000004,41.148999999999994,25.847000000000005,41.51499999999999,25.481000000000005),C.bezierCurveTo(41.87499999999999,25.120000000000005,42.233999999999995,24.764000000000006,42.62299999999999,24.433000000000007),C.bezierCurveTo(45.412,22.06,49.209,20.292,52.936,20.417),C.bezierCurveTo(53.589,20.423,52.878,20.415,52.936,20.417),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(95.227,45.606),C.bezierCurveTo(95.227,45.606,87.057,49.99,89.566,52.556000000000004),C.bezierCurveTo(89.566,52.556,93.823,52.886,95.227,45.606),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(55.554,-3.676),C.bezierCurveTo(55.596000000000004,-3.653,55.637,-3.629,55.677,-3.605),C.bezierCurveTo(55.604,-3.647,55.414,-3.755,55.554,-3.676),C.closePath(),C.moveTo(95.804,37.288),C.bezierCurveTo(94.26,38.766999999999996,93.737,40.934,92.69200000000001,42.729),C.bezierCurveTo(91.56800000000001,44.66,90.266,46.541,88.65700000000001,48.101),C.bezierCurveTo(87.31800000000001,49.397999999999996,85.44800000000001,50.195,84.52400000000002,51.887),C.bezierCurveTo(84.24700000000001,52.395,84.09100000000001,52.977000000000004,84.22900000000001,53.553),C.bezierCurveTo(84.31900000000002,53.928,84.61600000000001,54.733999999999995,85.046,54.733999999999995),C.bezierCurveTo(86.135,54.71999999999999,87.41300000000001,54.84199999999999,88.37,54.98499999999999),C.bezierCurveTo(90.37700000000001,55.11299999999999,92.38000000000001,54.84299999999999,93.923,53.45099999999999),C.bezierCurveTo(95.401,52.117999999999995,96.31700000000001,50.224,97.056,48.41),C.bezierCurveTo(98.553,44.728,99.809,39.895,95.804,37.288),C.bezierCurveTo(95.723,37.366,96.144,37.509,95.804,37.288),C.closePath(),C.moveTo(75.312,56.586),C.bezierCurveTo(73.577,56.193999999999996,71.90299999999999,55.531,70.13799999999999,55.299),C.bezierCurveTo(68.12499999999999,55.034,65.963,54.99,64.005,55.602),C.bezierCurveTo(67.87599999999999,58.904999999999994,72.844,61.327999999999996,78.03999999999999,60.979),C.bezierCurveTo(76.885,59.724,75.819,58.231,75.312,56.586),C.bezierCurveTo(74.923,56.498,75.5,57.194,75.312,56.586),C.closePath(),C.moveTo(80.79,63.998),C.bezierCurveTo(80.825,63.99,80.902,63.975,80.79,63.998),C.bezierCurveTo(80.79,63.998,80.808,63.994,80.79,63.998),C.closePath(),C.moveTo(86.137,65.646),C.bezierCurveTo(86.124,65.934,86.158,65.383,86.137,65.646),C.bezierCurveTo(86.135,65.688,86.139,65.621,86.137,65.646),C.closePath(),C.moveTo(86.125,65.768),C.bezierCurveTo(86.062,65.939,86.147,65.646,86.125,65.768),C.bezierCurveTo(86.125,65.768,86.127,65.757,86.125,65.768),C.closePath(),C.moveTo(59.365,79.673),C.bezierCurveTo(59.341,79.806,59.363,79.688,59.369,79.656),C.bezierCurveTo(59.385,79.575,59.384,79.581,59.365,79.673),C.closePath(),C.moveTo(77.219,25.95),C.bezierCurveTo(77.89,23.678,77.487,20.997999999999998,75.538,19.43),C.bezierCurveTo(75.16799999999999,19.132,74.797,18.833,74.42699999999999,18.535),C.bezierCurveTo(72.323,16.842,70.22,15.15,68.11599999999999,13.457),C.bezierCurveTo(65.70599999999999,11.517000000000001,63.29499999999999,9.577000000000002,60.883999999999986,7.636000000000001),C.bezierCurveTo(60.127999999999986,7.028000000000001,59.37299999999998,6.420000000000001,58.61799999999999,5.813000000000001),C.bezierCurveTo(58.45499999999999,5.682,58.292999999999985,5.551,58.12999999999999,5.420000000000001),C.bezierCurveTo(58.11399999999999,5.407000000000001,58.075999999999986,5.3870000000000005,58.06599999999999,5.368000000000001),C.bezierCurveTo(58.01899999999999,4.654000000000002,57.97699999999999,3.966000000000001,57.71399999999999,3.2910000000000013),C.bezierCurveTo(57.270999999999994,2.1570000000000014,56.44299999999999,1.200000000000001,55.526999999999994,.41700000000000115),C.bezierCurveTo(54.736,-.2589999999999989,53.818999999999996,-.7079999999999989,53.07599999999999,-1.4319999999999988),C.bezierCurveTo(51.138999999999996,-3.3179999999999987,49.51899999999999,-5.528999999999999,48.138999999999996,-7.847999999999999),C.bezierCurveTo(45.372,-5.23,44.456,-1.193,44.74,2.488),C.bezierCurveTo(44.765,2.816,44.669000000000004,3.403,45.052,3.401),C.bezierCurveTo(45.371,3.399,45.691,3.4,46.01,3.4029999999999996),C.bezierCurveTo(46.738,3.4109999999999996,47.467,3.4319999999999995,48.193999999999996,3.4749999999999996),C.bezierCurveTo(49.465999999999994,3.55,50.986999999999995,3.5809999999999995,52.147,4.178999999999999),C.bezierCurveTo(49.086999999999996,4.7509999999999994,46.103,5.486999999999999,43.113,6.344999999999999),C.bezierCurveTo(41.571,6.786999999999999,40.089,7.3599999999999985,38.608,7.967999999999999),C.bezierCurveTo(38.516,8.005999999999998,36.994,5.055999999999999,36.842,4.842999999999999),C.bezierCurveTo(34.077999999999996,1.001999999999999,29.146,-.7120000000000006,24.628999999999998,-1.3070000000000013),C.bezierCurveTo(22.499,-1.5870000000000013,20.343999999999998,-1.4960000000000013,18.205,-1.7550000000000012),C.bezierCurveTo(15.929999999999998,-2.030000000000001,13.671999999999997,-2.4190000000000014,11.418999999999999,-2.832000000000001),C.bezierCurveTo(11.512999999999998,3.1349999999999985,12.957999999999998,9.200999999999999,16.951,13.806000000000001),C.bezierCurveTo(18.336000000000002,15.402000000000001,19.93,16.643,21.797,17.607),C.bezierCurveTo(22.315,17.875,23.028000000000002,18.14,22.387,18.762),C.bezierCurveTo(21.285,19.830000000000002,20.191,20.883,19.282,22.126),C.bezierCurveTo(15.756,26.945,15.089,33.181,15.219999999999999,38.982),C.bezierCurveTo(15.36,45.144999999999996,16.840999999999998,51.213,16.785999999999998,57.372),C.bezierCurveTo(16.758,60.471000000000004,16.363999999999997,63.587,15.434999999999999,66.549),C.bezierCurveTo(14.985999999999999,67.97900000000001,14.412999999999998,69.375,13.671,70.679),C.bezierCurveTo(13.693,70.96600000000001,14.341999999999999,71.392,14.602,71.60300000000001),C.bezierCurveTo(15.23,72.11200000000001,15.893,72.57600000000001,16.574,73.01),C.bezierCurveTo(21.675,76.268,27.599000000000004,78.372,33.392,80.019),C.bezierCurveTo(36.434000000000005,80.884,39.521,81.608,42.645,82.10600000000001),C.bezierCurveTo(45.576,82.57300000000001,48.849000000000004,83.08500000000001,51.794000000000004,82.486),C.bezierCurveTo(52.963,82.248,54.11900000000001,81.768,54.969,80.909),C.bezierCurveTo(55.715,80.155,55.89,79.27900000000001,56.275,78.355),C.bezierCurveTo(57.323,75.79,59.607,73.998,61.986999999999995,72.726),C.bezierCurveTo(64.43499999999999,71.42,67.118,70.572,69.80699999999999,69.925),C.bezierCurveTo(72.25899999999999,69.335,74.74799999999999,69.136,77.213,68.66799999999999),C.bezierCurveTo(78.49199999999999,68.442,79.788,68.10499999999999,80.931,67.469),C.bezierCurveTo(81.63,67.08099999999999,82.75999999999999,66.31299999999999,82.773,65.393),C.bezierCurveTo(82.776,65.167,82.953,64.831,82.75699999999999,64.635),C.bezierCurveTo(82.48599999999999,64.316,81.93499999999999,64.194,81.54799999999999,64.114),C.bezierCurveTo(80.54199999999999,63.904,79.55299999999998,64.241,78.53999999999999,64.325),C.bezierCurveTo(73.059,64.781,67.70899999999999,62.656000000000006,63.37299999999999,59.414),C.bezierCurveTo(62.39799999999999,58.685,61.462999999999994,57.895,60.58899999999999,57.048),C.bezierCurveTo(59.95899999999999,56.431000000000004,60.03699999999999,56.25,59.18999999999999,56.571000000000005),C.bezierCurveTo(58.53199999999999,56.82000000000001,57.88099999999999,57.092000000000006,57.23699999999999,57.379000000000005),C.bezierCurveTo(55.844999999999985,58.00000000000001,54.472999999999985,58.687000000000005,53.161999999999985,59.465),C.bezierCurveTo(56.26099999999998,56.483000000000004,59.984999999999985,52.889,64.36299999999999,52.047000000000004),C.bezierCurveTo(65.76999999999998,51.776,67.21399999999998,51.716,68.64299999999999,51.786),C.bezierCurveTo(69.93599999999999,51.849000000000004,71.44599999999998,51.902,72.66999999999999,52.366),C.bezierCurveTo(75.59899999999999,53.391,78.76299999999999,53.935,81.82799999999999,54.366),C.bezierCurveTo(81.326,52.525,82.02299999999998,50.759,83.234,49.36),C.bezierCurveTo(84.33099999999999,48.124,85.78399999999999,47.379,86.95299999999999,46.234),C.bezierCurveTo(88.40199999999999,44.816,89.57199999999999,43.091,90.57799999999999,41.339),C.bezierCurveTo(91.40699999999998,39.896,91.85099999999998,38.235,92.87199999999999,36.894999999999996),C.bezierCurveTo(91.15699999999998,36.611,89.42199999999998,35.836,88.24799999999999,34.522999999999996),C.bezierCurveTo(87.169,33.352999999999994,86.103,32.613,84.57499999999999,32.059),C.bezierCurveTo(84.01499999999999,31.854999999999997,83.445,31.695999999999998,82.868,31.552999999999997),C.bezierCurveTo(82.265,31.403999999999996,81.428,31.760999999999996,80.836,31.915999999999997),C.bezierCurveTo(79.746,32.202,78.66499999999999,32.532,77.601,32.903),C.bezierCurveTo(78.809,31.808,80.223,30.942999999999998,81.658,30.179),C.bezierCurveTo(80.561,28.884999999999998,79.12,28.107999999999997,77.555,27.534),C.bezierCurveTo(77.25500000000001,27.424,76.49600000000001,27.747,76.185,27.828),C.bezierCurveTo(75.664,27.962,75.148,28.108999999999998,74.633,28.264),C.bezierCurveTo(74.033,28.445,73.437,28.634999999999998,72.845,28.84),C.bezierCurveTo(74.141,27.665,75.672,26.751,77.219,25.95),C.bezierCurveTo(77.254,25.831,75.926,26.62,77.219,25.95),C.closePath(),C.moveTo(81.273,60.663),C.bezierCurveTo(83.966,60.94499999999999,86.707,62.601,86.139,65.69),C.bezierCurveTo(85.797,68.134,83.928,69.835,81.764,70.817),C.bezierCurveTo(79.466,71.86,77.072,72.02999999999999,74.624,72.41),C.bezierCurveTo(71.612,72.877,68.594,73.568,65.75699999999999,74.697),C.bezierCurveTo(63.40799999999999,75.632,60.58899999999999,77.01,59.47699999999999,79.436),C.bezierCurveTo(59.05099999999999,80.36500000000001,58.86099999999999,81.31500000000001,58.26599999999999,82.183),C.bezierCurveTo(57.44199999999999,83.387,56.28699999999999,84.33000000000001,54.97399999999999,84.959),C.bezierCurveTo(52.20199999999999,86.288,49.00699999999999,86.181,46.01899999999999,85.919),C.bezierCurveTo(42.91199999999999,85.648,39.83099999999999,85.088,36.79499999999999,84.381),C.bezierCurveTo(30.633999999999986,82.944,24.51999999999999,80.934,18.840999999999987,78.127),C.bezierCurveTo(16.112999999999985,76.779,13.317999999999987,75.223,11.163999999999987,73.036),C.bezierCurveTo(10.560999999999988,72.425,10.062999999999988,71.738,9.550999999999988,71.052),C.bezierCurveTo(9.269999999999987,70.67500000000001,9.771999999999988,70.388,10.027999999999988,70.06200000000001),C.bezierCurveTo(10.483999999999988,69.48100000000001,10.852999999999987,68.84300000000002,11.176999999999989,68.18),C.bezierCurveTo(13.88099999999999,62.650000000000006,13.68899999999999,56.202000000000005,12.847999999999988,50.26500000000001),C.bezierCurveTo(12.016999999999989,44.126000000000005,11.367999999999988,37.82500000000001,12.213999999999988,31.65000000000001),C.bezierCurveTo(12.843999999999989,27.04600000000001,14.439999999999987,22.500000000000007,17.503999999999987,18.937000000000012),C.bezierCurveTo(12.962999999999987,15.419000000000011,10.098999999999986,10.218000000000012,8.856999999999987,4.663000000000013),C.bezierCurveTo(8.166,1.579,7.972,-1.58,8.08,-4.733),C.bezierCurveTo(8.102,-5.3229999999999995,8.129,-5.912999999999999,8.154,-6.504),C.bezierCurveTo(8.162,-6.688,8.122,-6.8,8.27,-6.91),C.bezierCurveTo(9.142,-6.728,10.012,-6.5440000000000005,10.886,-6.371),C.bezierCurveTo(14.038,-5.747000000000001,17.227999999999998,-5.174,20.433999999999997,-4.916),C.bezierCurveTo(21.798999999999996,-4.806,23.160999999999998,-4.869000000000001,24.522999999999996,-4.7170000000000005),C.bezierCurveTo(26.110999999999997,-4.539000000000001,27.686999999999998,-4.2330000000000005,29.223999999999997,-3.7970000000000006),C.bezierCurveTo(31.940999999999995,-3.0260000000000007,34.577999999999996,-1.8410000000000006,36.787,-.0600000000000005),C.bezierCurveTo(37.827,.7779999999999995,38.760999999999996,1.7439999999999996,39.543,2.8269999999999995),C.bezierCurveTo(39.747,3.1089999999999995,39.937,3.3999999999999995,40.121,3.6949999999999994),C.bezierCurveTo(40.256,3.7549999999999994,40.679,3.5649999999999995,40.855000000000004,3.5069999999999992),C.bezierCurveTo(40.883,3.4979999999999993,41.418000000000006,3.3439999999999994,41.431000000000004,3.325999999999999),C.bezierCurveTo(41.38,2.887999999999999,41.353,2.446999999999999,41.334,2.007999999999999),C.bezierCurveTo(41.1,-3.601,43.325,-8.755,47.943,-12.016),C.bezierCurveTo(48.166999999999994,-12.174,48.985,-12.957,49.25,-12.89),C.bezierCurveTo(49.511,-12.823,49.911,-11.645,50.043,-11.382000000000001),C.bezierCurveTo(50.4,-10.669000000000002,50.789,-9.973,51.202999999999996,-9.291),C.bezierCurveTo(52.675999999999995,-6.873,54.367999999999995,-4.598000000000001,56.678999999999995,-2.955),C.bezierCurveTo(57.766,-2.183,58.76199999999999,-1.264,59.56999999999999,-.1990000000000003),C.bezierCurveTo(59.98799999999999,.35299999999999976,60.352999999999994,.9459999999999997,60.644999999999996,1.5749999999999997),C.bezierCurveTo(60.925999999999995,2.183,60.964,3.0469999999999997,61.284,3.598),C.bezierCurveTo(61.56,4.074,62.397,4.526,62.836999999999996,4.879),C.bezierCurveTo(63.455,5.377,64.074,5.874,64.692,6.372),C.bezierCurveTo(66.03299999999999,7.45,67.374,8.527,68.71499999999999,9.604),C.bezierCurveTo(71.29299999999999,11.675999999999998,73.871,13.75,76.44399999999999,15.828),C.bezierCurveTo(78.80199999999999,17.733999999999998,80.63999999999999,19.945999999999998,80.90799999999999,23.098),C.bezierCurveTo(80.969,23.822,80.94399999999999,24.558,80.832,25.274),C.bezierCurveTo(81.687,25.741,82.494,26.298000000000002,83.217,26.953),C.bezierCurveTo(83.737,27.423,84.21,27.941,84.629,28.502),C.bezierCurveTo(85.03200000000001,28.788,85.75500000000001,28.892,86.22800000000001,29.079),C.bezierCurveTo(87.45400000000001,29.565,88.66000000000001,30.183,89.661,31.052),C.bezierCurveTo(90.655,31.916,91.164,32.874,92.485,33.328),C.bezierCurveTo(93.547,33.693000000000005,94.652,33.684000000000005,95.755,33.568000000000005),C.bezierCurveTo(96.19399999999999,33.522000000000006,96.892,34.00900000000001,97.253,34.221000000000004),C.bezierCurveTo(97.864,34.575,98.435,35.001000000000005,98.953,35.480000000000004),C.bezierCurveTo(101.134,37.498000000000005,102.102,40.379000000000005,101.906,43.313),C.bezierCurveTo(101.71900000000001,46.084,100.64,48.882000000000005,99.435,51.358000000000004),C.bezierCurveTo(98.24300000000001,53.809000000000005,96.57900000000001,56.159000000000006,94.07300000000001,57.391000000000005),C.bezierCurveTo(91.784,58.517,89.33600000000001,58.447,86.87400000000001,58.2),C.bezierCurveTo(85.63900000000001,58.075,84.42600000000002,58.138000000000005,83.19600000000001,57.969),C.bezierCurveTo(81.57700000000001,57.746,79.96200000000002,57.49,78.35300000000001,57.198),C.bezierCurveTo(79.107,58.503,80.175,59.644,81.273,60.663),C.bezierCurveTo(81.394,60.676,80.893,60.311,81.273,60.663),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.arc(54.042,26.792,2.95,0,6.283185307179586,!0),C.closePath(),C.fill(),C.stroke(),C.restore(),C.restore()},T.getVersions=function(){return o},T.getBaseWidth=function(){return 105},T.getBaseHeight=function(){return 102},T.getDrawOffsetX=function(){return-1},T.getDrawOffsetY=function(){return 0},T.getScale=function(){return.18},GameInventoryManager&&GameInventoryManager.register("pig_head",e),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.Pig_Head=e)}();