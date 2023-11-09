
<template>
  <div class="home-wrapper">
    <h1>Home Page</h1>
    <!-- <button @click="show = !show">Show List</button> -->
    <!-- <LazyList v-if="show" /> -->
    <div class="home-wrapper-content">
      <form @submit.prevent="formSubmit">
        <div class="form-item">
          <input placeholder="name" name="name" v-model="formValue.name" />
        </div>
        <div class="form-item">
          <input placeholder="roll no" name="roll" v-model="formValue.roll" />
        </div>
        <div class="form-item">
          <button type="submit">
            {{ editIndex === -1 ? "submit" : "Update" }}
          </button>
        </div>
      </form>
      <div v-if="formArray.length > 0" class="listform-value">
        <div v-for="(data, index) in formArray" :key="index" class="item">
          <div>{{ index + 1 }}</div>
          <div>{{ data.name }}</div>
          <div>{{ data.roll }}</div>
          <div class="delete" @click="deleteFun(index)">X</div>
          <div class="delete" @click="editFun(index)">Edit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// const show = ref(false);

// definePageMeta({
//   middleware: "auth",
// });

let formValue = {
  name: "",
  roll: "",
};

const formArray = ref([]);

const editIndex = ref(-1); // -1 means not editable field !

const formSubmit = () => {
  if (editIndex.value === -1) {
    formArray.value.push({ name: formValue.name, roll: formValue.roll });
  } else {
    formArray.value[editIndex.value] = {
      name: formValue.name,
      roll: formValue.roll,
    };
    editIndex.value = -1;
  }
  formValue.name = "";
  formValue.roll = "";
};

const deleteFun = (id) => {
  formArray.value.splice(id, 1);
};

const editFun = (id) => {
  editIndex.value = id;
  formValue = {
    name: formArray.value[id].name,
    roll: formArray.value[id].roll,
  };
};

// import List from "~/components/List/List.vue";

// export default {
//   name: "HomePage",
//   List,
//   data() {
//     return {
//       show: false,
//     };
//   },
//   methods: {
//     showToggle() {
//       this.show = !this.show;
//     },
//   },
// };
</script>

<style lang='scss'>
.home-wrapper {
  padding: 0 10%;
  .home-wrapper-content {
    display: flex;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    form {
      width: 350px;
      .form-item {
        margin-bottom: 15px;
        input {
          width: 100%;
          height: 35px;
          border-radius: 4px;
          border: 1px solid #ccc;
          padding: 0 12px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
        }
        button {
          width: 100%;
          height: 35px;
          border: none;
          font-size: 14px;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer !important;
          margin-top: 20px;
        }
      }
    }
    .listform-value {
      margin-left: 50px;
      flex: 1;
      .item {
        display: flex;
        padding: 10px 10px;
        div {
          margin: 0 10px;
          min-width: 50px;
          &:last-child {
            margin-left: auto;
          }
        }
        .delete {
          color: red;
          cursor: pointer !important;
        }
      }
    }
  }
}
</style>