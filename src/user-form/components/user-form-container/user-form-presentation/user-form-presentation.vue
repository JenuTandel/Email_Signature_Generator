<template>
  <div class="card rounded-4 mx-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h4 class="fw-normal fst-italic">User Form</h4>
    </div>
    <!-- end: card-title -->
    <!-- start: card-body -->
    <div class="card-body">
      <!-- start: user form -->
      <form class="user-form">
        <div class="mb-3">
          <label class="mb-1" for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Ex. Jinal Tandel"
            name="name"
          />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="emailid">Email ID:</label>
          <input type="text" class="form-control" name="emailid" />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="designation">Designation:</label>
          <input type="text" class="form-control" name="designation" />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="department">Select Department:</label>
          <select id="department" class="form-select">
            <option>Select</option>
            <option>FrontEnd</option>
            <option>Backend</option>
            <option>Data</option>
            <option>RPA</option>
            <option>Mobile App</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="contactNumber">Contact Number:</label>
          <input type="text" class="form-control" name="contactNumber" />
        </div>
        <div class="mb-3">
          <div>
            <label class="mb-1" for="profileImage">Profile Photo:</label>
          </div>
          <img src="~@/assets/images/profile-skeleton.png" alt="Preview" />
          <input
            type="file"
            class="form-control"
            id="profileImage"
            name="profileImage"
            style="display: none"
          />
          <button class="btn btn-outline-dark ms-4">
            <span class="fst-italic">Change</span>
          </button>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="name">Github Link:</label>
          <input type="text" class="form-control" name="contactNumber" />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="name">LinkedIn Link:</label>
          <input type="text" class="form-control" name="contactNumber" />
        </div>
        <div class="text-center">
          <button class="btn btn-primary px-4">
            <span class="text-white fw-light fst-italic">Generate</span>
          </button>
        </div>
      </form>
      <!-- end: user form -->
    </div>
    <!-- end: card body -->
  </div>
</template>

<script setup lang="ts"></script>
