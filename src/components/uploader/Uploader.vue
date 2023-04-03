<template>
  <div class="mt-10 mb-5 uploader-box pa-3 shadow-lg w-100">
    <div class="d-flex justify-center text-center w-100">
      <form multiple="multiple" class="w-100">
        <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true"
             @dragleave="dragging = false">
          <div class="dropZone-info" @drag="handleAddMediaFile">
            <span class="fa fa-cloud-upload dropZone-title"></span>
            <span class="dropZone-title text-dark fs-4"><span>Drop</span>file or<span>click</span> to upload</span>
          </div>
          <div>
            <div class="text-center d-flex justify-center w-100">
              <input type="file" class="custom-file-input" @input="handleAddMediaFile" multiple>
            </div>
          </div>
          <div class="dropZone-upload-limit-info">
            <div>extension support: Jpg, Jpeg, Png, Mp4, Mkv</div>
            <div>maximum file size: 5 MB</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

import mediaComposable from "../../composables/mediaComposable";

const {createFile, handleAddMediaFile, files, dragging} = mediaComposable()

</script>

<style scoped>

.uploader-box {
  border: 2px dashed grey;
}

.dropZone-info span {
  font-size: 22px;
  font-weight: 650;
}
.dropZone-upload-limit-info {
  color: grey;
}
.v-field {
  display: none !important;
}

.custom-file-input {
  color: transparent;
}

.custom-file-input {
  background: lightgray;
  width: 150px;
  border-radius: 4px;
  color: black;
  margin: 15px 0;
}

.custom-file-input::before {
  content: 'Upload your Files ';
  border: none;

  text-align: center;
  display: inline-block;
  border-radius: 12px;
  outline: none;
  white-space: nowrap;
  padding: 5px 8px;
  -webkit-user-select: none;
  cursor: pointer;
  font-weight: 550;
  font-size: 18px;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}



</style>