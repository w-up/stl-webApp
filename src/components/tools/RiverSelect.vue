<template>
  <a-cascader style="display:inline-block;" :options="options" @change="onChange" changeOnSelect />
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '上海',
        label: '上海',
        children: [{
          value: '浦东新区',
          label: '浦东新区',
          children: [{
            value: '浦东镇1',
            label: '浦东镇1',
          },
          {
            value: '浦东镇2',
            label: '浦东镇2',
          },
          {
            value: '浦东镇3',
            label: '浦东镇3',
          }],
        },
        {
          value: '闵行区',
          label: '闵行区',
          children: [{
            value: '闵行路1',
            label: '闵行路1',
          },
          {
            value: '闵行路2',
            label: '闵行路2',
          },
          {
            value: '闵行路3',
            label: '闵行路3',
          }],
        },
        {
          value: '徐汇区',
          label: '徐汇区',
          children: [{
            value: '徐汇区1',
            label: '徐汇区1',
          },
          {
            value: '徐汇区2',
            label: '徐汇区2',
          },
          {
            value: '徐汇区3',
            label: '徐汇区3',
          }],
        }],
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          }],
        }],
      }]
    }
  },
  methods: {
    onChange(value) {
      console.log(value);
    }
  }
}
</script>