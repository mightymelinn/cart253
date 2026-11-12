# Reflective Journal

<details>
<summary><b>Entry 1: September 14, 2026</b></summary>
<br>

## September 14, 2026

I have some previous experience working with Markdown files on GitHub, so the setup felt familiar. What surprised me this time is how much my own design philosophy has changed. I used to be the type of person who felt the need to decorate my README files highly aesthetically, especially for my personal repository. Lately, I find myself drawn to an approach that is simpler, more efficient, and driven by clear functionality. Currently, the only decorations I use are **custom shields**, which remain visually clean while conveying information effectively.

As for what is still difficult to understand, finding the balance between creative expression and a clean documentation structure can be a challenge for me. I want an efficient style that allows my creative coding to be the main focus, rather than distracting people with too much text formatting on the page itself.

When a future audience looks at my GitHub, I hope they immediately feel a sense of organized clarity. I want them to see my work as intentional and accessible. My aspiration for this class is to build a strong foundation where I can hone my JavaScript programming skills. I want the freedom to prototype complex mechanics efficiently, without wasting time trying to make my files look pretty every single week.

<br>
<div align="center">
  <img src="images/09142026-JournalEntry_1.png" alt="Website Prototype Screenshot" width="50%" />
  
  *My README on Git Page*
</div>
</details>

<details>
<summary><b>Entry 2: September 29, 2026</b></summary>
<br>

## September 29, 2026

I was a bit busy this week, so I didn't have time to explore the new library as I expected, but I learned how to download the library from [YouTube](https://youtu.be/kduBV0OhrII). I found this guy who explained it very well. I played around a bit and created a spinning cube and a draggable cylinder. I hope I can spend more time soon starting to learn how to control the camera movement (to make it like an FPS) and export scenes from Unreal Engine 5.

<br>
<div align="center">
  <img src="https://github.com/user-attachments/assets/130c5c07-c60c-4eb7-984f-aefd26b47e52" alt="First Time Using Three.js" width="50%" />
  
</div>
</details>

<details>
<summary><b>Entry 3: October 9, 2026</b></summary>
<br>

## October 9, 2026

I experimented with camera movement in three.js this week, and it actually felt pretty familiar becasue it reminded me of learning game development in Construct 3, which also uses JavaScript to assign functions to all inputs to move in 3D space. Since three.js has a lot of ready-to-use functions, I spent most of my time this week reading through the ones that interested me and could help with my project.

When I started exporting 3D models from Unreal Engine 5, I ran into a problem with the metrics where UE5 works in centimeters, but three.js works in meters. I found a really useful website called [glTF Viewer](https://gltf-viewer.donmccurdy.com/) to help me preview how my 3D models will look in three.js. It helps me catch errors (like forgetting to export textures) before putting them into my code.

<br>
<div align="center">
  <img width="50%" alt="Recording 2026-10-09 095654" src="https://github.com/user-attachments/assets/7b73aa08-c516-4734-a62d-dc8502381a2a" />
</div>
</details>

<details>
<summary><b>Entry 4: October 20, 2026</b></summary>
<br>

## October 20, 2026

1. I added collision to the objects in my scene so the player can't walk through them. I learned from this [video](https://youtu.be/9H3HPq-BTMo) and the [three.js Box3 documentation](https://threejs.org/docs/#Box3).

**Code changes:** [00553473697ebf511ba6b3a706fba881480be73f](https://github.com/mightymelinn/cart253/commit/00553473697ebf511ba6b3a706fba881480be73f)
> I created an invisible bounding box for every solid object using `new THREE.Box3().setFromObject(object)`, and a box around the player. Every frame, my function `hitSomething()` checks if the player's box intersects any object's box. Before moving, the game remembers where the player is standing. If the new position doesn't intersect anything, the movement is continued. If it does, the movement is undone, so the player stops at the edge of the object. The video uses collision to change an object's look when touched. I adapted it to block the player's movement. For the spinning cube, I used `cube.geometry.computeBoundingBox()` so the box can follow the cube as it rotates.

2. I added an interaction where the player can pick up the object they are looking at. I used raycasting, based on our discussion last last week.

**Code changes:** [2e0c656d242e55997d9975bfbf8bd130674a0fef](PASTE-COMMIT-LINK-HERE)
> Every frame, a ray is cast from the center of the screen (where the player is looking). It only checks objects in my pickable list (currently only the cube). If the ray hits it within 3 units, the object is highlighted white. If the player presses E while an object is highlighted, it is removed from everything.
>
> I first watched this [video](https://youtu.be/tgwS1xxzc9s), but I was quite confused, so I also used the [three.js interactive cubes example](https://threejs.org/examples/#webgl_interactive_cubes) and the [three.js picking manual](https://threejs.org/manual/#en/picking) as references. I found that I prefer reading documentation over following YouTube videos.
>
> Right now, picked-up objects simply disappear, and I don't store any data yet. My idea is to put each collected object into an array, and once the player has collected 3 objects, call an end function. I'll figure out how next week.

My plan changed a bit from my weekly milestones. I first planned to use a mouse click to pick up objects, but I used the E key instead, since it's more common interact key in FPS games. I decided not to import the house layput from UE5 yet, because I still need to make changes to my map. However, I've already learned how to export assets from UE5 as .glb and load them into three.js, so I should be ready when the map is done. I also made the lighting more realistic by adding a directional light (+ shadows). I also added looping ambience sound that starts when the player clicks into the game.

**Next week:** my main.js is getting long and hard to scroll through, so I want to start organizing my code into separate files. 

<br>
<div align="center">

<img width="50%" height="666" alt="20261021-0337-58 4822110" src="https://github.com/user-attachments/assets/d1b66792-10c3-4131-a58e-6d9c25ce8a01" />


</div>
</details>

<details>
<summary><b>Entry 5: November 6, 2026</b></summary>
<br>

## November 6, 2026
I fell behind this week. So this entry includes my work from last week too, because I forgot to commit until today, so everything is in one big commit. I tried to export my house from UE5 since last week, but I couldn't figure out how to add collision to it. I could have asked Sabine right away when I got stuck, but I was busy with a game jam. So I decided to work on something else first (the Weeping Angel enemy). Making the outline for the pickup items also took longer than I expected, and that's part of why I forgot to commit.

My first house export had a giant sky mesh (32768 units wide) that trapped the player inside it, so I re-exported without it. The hardest part was exporting my enemy with its animation, because the animation was made for a different skeleton. I haven't added the heartbeat sound yet.

1. I split my code into separate files.

**Code changes:** [88001cad3d488f28416cc4679a1502bd50e5dcf2](https://github.com/mightymelinn/cart253/commit/bd08a27fb2646669375361b0c2753c932c8bd3f1)

> `world.js` has the scene, camera, lights, sound and models. `player.js` has the mouse look, walking and collision. `pickup.js` has the items and progress UI. `enemy.js` has the enemy. `main.js` only runs the game loop and calls the update function from each file in order. I use export and import to share stuff between files.

2. I added 3 pickup items with a progress UI and a game end.

> I made 3 items with a `for` loop and stored them in an items array. A counter at the top left shows how many items the player collected. Every time the player picks one up, it gets removed from the pickables array. When the array is empty, the game shows "Game End" text. Each item also has a collision box, which gets removed when the item is picked up.

3. I changed how the pickup feedback works.

> Items now get a white outline when the player is nearby. I check the distance from the player to each item and use OutlinePass to draw the outline. When the player looks at a nearby item, it glows like white color. The player can only pick up an item when it is close and being looked at using raycasting.

4. I added a Weeping Angel enemy. It only moves when the player is not looking at.

**Code changes:** [bd08a27fb2646669375361b0c2753c932c8bd3f1](https://github.com/mightymelinn/cart253/commit/88001cad3d488f28416cc4679a1502bd50e5dcf2)
> Every frame, I check if the enemy is inside the camera's view with a frustum check. If it is seen, its animation and movement stop. If not, it walks toward the player using vectors. If it gets within 1 unit, the screen says "She caught you" and the game restarts after 1 second.

**Next week:** I want to add collision to the whole house and start polishing!

<br>
</details>

<details>
<summary><b>Entry 6: November 12, 2026</b></summary>
<br>

## November 12, 2026
This week was CRAZY. I realized my plan changed a lot because I wrote it from the perspective of someone who uses a game engine when I plan each week's milestone. In UE5, collision, line traces and NavMesh are already built in, but in three.js I have to build them myself. Because of that, I didn't get to finish the ending letter that I planned for this week.

1. I added collision to the whole house using an Octree.

**Code changes:** [5495e0630e24a4b4f1017973298b4ccd8e50a608](https://github.com/mightymelinn/cart253/commit/5495e0630e24a4b4f1017973298b4ccd8e50a608)
> This one was very time-consuming because I tried lots of approach. When I searched on YouTube, I mostly found voxel tutorials and Rapier.js, so I used the official three.js FPS example ([games_fps](https://threejs.org/examples/?q=fps#games_fps)) as my reference instead. So `worldOctree.fromGraphNode()` turns my house model into collision data that uses the real shape of the house. The player is a capsule like in game engines. Every frame, `capsuleIntersect()` checks if the capsule touches a wall.

2. I added collision to the enemy so she can't walk through walls.

**Code changes:** [464fbd65e62b4be7b0ad5fb96777d21db8c4192a](https://github.com/mightymelinn/cart253/commit/464fbd65e62b4be7b0ad5fb96777d21db8c4192a)
> The enemy uses the same capsule and Octree as the player. BUT it looks weird as the root motion in animation makes the animation also pushes her body forward, away from `enemy.position`. I debugged by creating red outline in the enemy's capsule.

3. I added line of sight to the enemy using raycasting.

> Before that, the enemy froze whenever she was on the screen. Now I also shoot a ray from the player's eyes to her chest using `rayIntersect()`. If the ray hits a wall before it reaches her, she is hidden, so she keeps moving. Same idea as a Line Trace in UE5. I love the outcome that it somehow disturbing and I think I can implement it more.

4. I added footstep sound to the enemy.

**Code changes:** [f213b38c7347ab4024185a3dfc91bfcf1f8f7292](https://github.com/mightymelinn/cart253/commit/f213b38c7347ab4024185a3dfc91bfcf1f8f7292)
> The footsteps get louder when she gets closer using [Positional Audio](https://www.youtube.com/watch?v=9gBW8XEyMP8). I use `THREE.MathUtils.clamp()` to change her movement into a volume between 0 and 1. The footsteps only play while she moves, and stop when the player looks at her.

5. I implemented pickup feedback

**Code changes:** [a622f44968fc0ab0af31a6e5363ed9bcb99d510e](https://github.com/mightymelinn/cart253/commit/a622f44968fc0ab0af31a6e5363ed9bcb99d510e)
> Each item plays a sound when it's picked up. When the player looks at an item, "Press E to pick up" shows using `project(camera)` to turn the item's 3D position into a 2D position on the screen, then move an HTML text there every frame.

**Next week:** The enemy movement still weird since she just slide with the wall. I will look for the best practice for enemy movement. I also want to add the ending letter with a Steam wishlist button, and move my item notes into a JSON file for the Data milestone. And then should start polishing the whole environment!

<br>
</details>
