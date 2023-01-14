<template>
    <div id="camera">
    </div>
    <div id="controls">
        <button class='btn' id="camera_btn">Camera</button>
        <button class='btn' id="micr_btn">Microphone</button>
        <button class='btn' id="chach_btn">Chach</button>
        <button class='btn' id="leave_btn">Leave</button>
    </div>
   
</template>
<style>
.btn {
    cursor: pointer;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    width: 1.5em;
    height: 1.5em;
    border-radius: 100%;
    color: #fff;
    background: #0f0;
    border-radius: 100px;
}

#camera_btn {}

#micr_btn {}

#leave_btn {
    background-color: red;
}
</style>

