# [Free Rider track editor v1.1](https://freerider.app/)

[![https://freerider.app/assets/images/gui/toolbar.png](https://freerider.app/assets/images/gui/toolbar.png)](https://freerider.app/draw)

**new tools and options:**

* **circle tool** - draw a circle or ellipse from a center point. on the bottom toolbar, the "Segment Length" slider changes the length of lines in your circle.

* **select tool** - select lines and powerups in your track and move, scale, rotate, and flip the selection, or select points to change their position.

* **object tool option** - import or select your object, click the cube icon on either toolbar, and place objects with the line tools.

**more features:**

* **start position** - press the "Set Start Position" button on the bottom toolbar and drag Pete to change where the rider starts in your track.

* **snap near** - line snap now snaps to the nearest line endpoint, and now you can snap the second point of your line and powerups.

* **line trim** - eraser tool now has a "Line Trim" option that only erases the section of the line your eraser touches.

* **grid options** - along with grid size, you can change the grid type between standard and isometric, and between visible, hidden, or no-snap grid.

* **camera options** - with the camera tool selected, set the camera speed and choose the type of camera movement on the bottom tool bar.

* **change keybinds** - in the "Hotkeys" and "Controls" menus, select a button and press a new key to change the keybind.

* **new import dialog** - type a track name in the import text field and press import to load a track, or press add to combine with the current track.

* **new export dialog** - when exporting, see your line and powerup counts, and you can now choose the file name when saving as file.

**ghosting tools:**

* **rewind** - places a checkpoint every game tick, allowing you to rewind using backspace.

* **old-timer** - when returning to checkpoints, the timer returns to the time the checkpoint was collected.

* **slow-mode** - the rider is constantly in the state of slow-motion, and this slows the timer as well.

* **bike/vehicle data** - shows the head angle and speed of the rider.

* **visible hitboxes** - shows the masses and springs for the bikes and vehicles.

* **input display** - shows the keys that are pressed.

**new mods:**

* **mario mode**

* **invincible rider**

* **invisible rider**

* **no clip**

* **mini-bike**

* **"x" to crouch**

* **"x" to fly with a propeller**

* **old-school front brake**

**...and more!**

this new editor is built from a combination of Char's Offline Editor and Polygon's Mod with added functionality. if you haven't checked out the full bug fix/update list for Polygon's Mod, you can find it [here](https://community.freeriderhd.com/threads/polygons-mod.11712/).

I want to express my gratitude and share credit with all of the developers that made this possible. [Pie42](https://github.com/Pie42), [Char](https://github.com/charlesbodman), [Polygon](https://github.com/plygon), [Calculus](https://github.com/Calculamatrise), [pinn](https://github.com/joelwhuff), and everyone else that either directly contributed, laid the foundation, or helped along the way. I love this game and I deeply appreciate everyone who continues to give it life.

as a disclaimer, this is not meant to be a replacement for or an alternative to Free Rider HD. the purpose of the new track editor is to help trackmakers to hone their craft and ghosters to practice their skills, not as a place to publish tracks and make ghosts. if you're looking for an improved DB experience, [Calculus](https://github.com/Calculamatrise) is doing a great job with [Free Rider Lite](https://community.freeriderhd.com/threads/11679).

check out the info below for more info about the object tool option and how you can contribute to this project!

![https://freerider.app/assets/images/gui/cube.png](https://freerider.app/assets/images/gui/cube.png)

if you've used the dream machine track editor, you're likely familiar with how objects work! but here's a bit of a deep dive into the new tool option.

first things first, clicking on the cube icon on either toolbar will open the "Import Object" dialog. here you can select from pre-made objects or import your own using a track code. not only can you have objects made of physics and scenery lines, but powerups as well!

you can also use the select tool to select a part of your track and press "Copy Selection as Object" on the bottom toolbar to create an object. the select tool and object tool option share most features and controls, so most information here can be applied to the select tool as well!

once you have your object, you can transform it (hold control to see transformation data) using the following controls:

* **r** - rotate clockwise

* **s** - scale up

* **f** - flip horizontally

* **i** - invert line type

* **shift** + **r** - rotate counterclockwise

* **shift** + **s** - scale down

* **shift** + **f** - flip vertically

* **ctrl** + **arrow keys** - move the object on the canvas

* **shift** + **arrow keys** - change offset (position of your object relative to your cursor and the center point for transformations)

to place an object, choose any of the line tools, make sure the cube is selected on the right toolbar, and place your objects like you would place lines. the straight line tool allows you to place one object at a time, but you can also make curves, circles, or use the object as a brush! try using the segment length sliders, and press the "Options" button for the brush tool to see some cool object brush options, like rotation and scaling based on mouse movement and brush jitter.

as you use the line tools, you're also able to use grid and snap options! this will snap your cursor to the grid or to the closest line endpoint. in combination with changing the object offset, this allows for more precision in placing your objects. pressing "Grid" or "Snap" on the bottom toolbar opens up their respective settings, and pressing "Object" shows you the buttons to import, export, or clear objects.

with the introduction of objects, there's an opportunity for trackmakers to share assets like track parts and brushes! these could be trees, clouds, outlines, patterns, any thing you find is helpful to use as an object. if you'd like to contribute by sharing objects, just send the codes my way (give them cute/informative names!) and I'll create a folder with your username in the "Import Object" dialog. the organization of the folders is subject to change though. remember these will be available to everyone to use as they please!

if you guys have any questions, feel free to ask! and any bugs you find or ideas you have, let us know! this editor is for all of you.

**2025-02-02**

* add rotation for ellipse option

**2025-01-22**

* add localStorage logging of completed tracks, shown as blue tracks in tracklist

* improve import dialog UI (random and daily and typing a track name all show track preview)

**2025-01-19**

* add ellipse option to circle tool

* add stretch to object tool option (m to stretch x-axis, n to stretch y-axis)

**2025-01-08**

* add "always draw point data" mod

**2025-01-07**

* add play mode

* add mobile mode

**2025-01-06**

* add "snap to 15" mod

**2025-01-03**

* fix upside-down hat color bug

**2024-12-31**

* first click on cube icon enables tool option, second click opens import dialog

**2024-12-30**

* add preview images to track and object import dialogs

* sort objects alphabetically

* stop object movement when pressing "alt"

* undo transformations on the currently selected object while keeping it selected

* selected object(s) will continue to be rendered even when not using the select tool

* don't focus camera on player when holding moving selection with d-pad

**2024-12-27**

* add "click snap" option to snap

* fix line data not showing when using point snap

* fix selection option button not updating state

**2024-12-25**

* add frhd track id fetching to import

**2024-12-16**

* add scale sensitivity option for object tool

**2024-12-02**

* add batched undo/redo to brush tool

* add faster input polling to brush tool

**2024-11-03**

* add daily tracks

**2024-10-23**

* automatically saves objects locally and adds them to the dropdown list

**2024-10-22**

* add line type options to select tool

* use "alt" to add or remove lines from selection

**2024-07-16**

* move camera towards mouse for select, teleports, and start position tool

* press "ctrl" when selecting to create selection area

* fix issue of selecting single line/point when trying to move selection area

**2024-07-14**

* add "clean track" button to export dialog

* add confirmation alert before closing game

* reset center when selecting single line/point/powerup

* fix issue with rotation of gravity and boost powerups

**2024-07-11**

* fix issue with temporary powerups getting duplicated

* fix issue with single selected powerups not copying correctly

**2024-07-08**

* initial release
