<template>
  <div class="home-wrapper">
    <h1>Home Page</h1>
    <!-- <button @click="show = !show">Show List</button> -->
    <!-- <LazyList v-if="show" /> -->
    <div class="home-wrapper-content">
      <form @submit.prevent="formSubmit">
        <div class="form-item">
          <input placeholder="name" name="name" v-model="formValue.stuName" />
        </div>
        <div class="form-item">
          <input placeholder="roll no" name="roll" v-model="formValue.roll" />
        </div>
        <div class="form-item">
          <button type="submit">
            {{ editIndex === -1 ? 'submit' : 'Update' }}
          </button>
        </div>
      </form>
      <div v-if="students?.length > 0" class="listform-value">
        <div v-for="(data, index) in students" :key="data?.id" class="item">
          <div>{{ index + 1 }}</div>
          <div>{{ data?.stuName }}</div>
          <div>{{ data?.roll }}</div>
          <div class="delete" @click="deleteFun(data?.id)">X</div>
          <div class="delete" @click="editFun(data?.id)">Edit</div>
        </div>
      </div>
    </div>
    <div class="stu-name-wrapper">
      <div
        v-for="(boxData, boxIndex) in generateBoxes()"
        :key="boxIndex"
        class="box"
      >
        <div v-for="(data, index) in boxData" class="item" :key="index">
          {{ data.stuName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// const show = ref(false);

import { base_url } from '~/constants/constant';

// definePageMeta({
//   middleware: "auth",
// });

const formValue = ref({
  stuName: '',
  roll: '',
});

console.log('formValue', formValue.value);

const editIndex = ref(-1); // -1 means not editable field !

const {
  data: students,
  error,
  pending,
  refresh,
} = useFetch(`${base_url}/students`);
refresh();

const generateBoxes = () => {
  const boxes = [];
  const totalData = students.value.length;
  const maxBoxes = 4;

  // Calculate the dynamic slice size to fill the boxes equally
  const sliceSize = Math.floor(totalData / maxBoxes);
  console.log('sliceSize', sliceSize);

  for (let i = 0; i < totalData; i++) {
    const endIndex = i + sliceSize;
    // const boxData = students.value.slice(i, endIndex);
    const boxData = students.value.slice(i, endIndex);
    boxes.push(boxData);
  }

  return boxes;
};

const formSubmit = async () => {
  try {
    if (formValue.value.stuName !== '' && formValue.value.roll !== '') {
      if (editIndex.value === -1) {
        await useFetch(`${base_url}/students`, {
          method: 'POST',
          body: formValue.value,
        });
      } else {
        await useFetch(`${base_url}/students/${editIndex.value}`, {
          method: 'PUT',
          body: formValue.value,
        });
        editIndex.value = -1;
      }

      refresh();
      formValue.value = { stuName: '', roll: '' };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const deleteFun = async (id) => {
  try {
    await useFetch(`${base_url}/students/${id}`, {
      method: 'DELETE',
    });
    refresh();
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

const editFun = async (id) => {
  editIndex.value = id;

  const { data: singleData } = await useFetch(`${base_url}/students/${id}`);

  formValue.value = {
    stuName: singleData.value.stuName,
    roll: singleData.value.roll,
  };
};

console.log('data', toRaw(students.value));

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

<style lang="scss">
.stu-name-wrapper {
  margin-block: 50px;
  display: flex;
  flex-wrap: wrap;
  .box {
    padding: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    width: 33.33%;
  }
}
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
