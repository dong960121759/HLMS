<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" :label-position="'right'" label-width="30%">
    <el-row v-for="(row, i) in columns" :key="i" :gutter="20">
      <el-col v-for="(x, idx) in row" :key="idx" :span="24 / rowSize">
        <el-form-item :label="x.label+':'" :prop="x.prop">
          <component :is="x['is']" v-model.trim="form[x.prop]" v-bind="componentAttrs(x)" class="width-full" />
        </el-form-item>
      </el-col>
    </el-row>
    <div v-if="footer" class="searchBtn">
      <el-button class="filter-item" size="mini" @click="reset">重置</el-button>
      <el-button class="filter-item" size="mini" type="primary" @click="submit">查询</el-button>
    </div>
  </el-form>
</template>

<script>
import { chunk, fromEntries } from './util'
// import { fromEntries } from './fromEntries'
export default {
  components: {
    selectBar: {
      functional: true,
      props: { value: String, list: Array, callback: Function },
      render(h, { props: { value = '', list = [], callback }, data: { attrs = {}}, listeners: { input }}) {
        return h('el-select', { class: 'width-full', props: { value, ...attrs }, on: { change(v) { input(v); callback(v) } }}, list.map(o => h('el-option', { props: { ...o, key: o.value }})))
      }
    },
    checkbox: {
      functional: true,
      props: { value: Boolean, label: String },
      render(h, { props: { value = '', label = '' }, data: { attrs = {}}, listeners: { input }}) {
        return h('el-checkbox', { props: { value, ...attrs }, on: { change(v) { input(v) } }}, label)
      }
    },
    checkboxGroup: {
      functional: true,
      props: { value: Array, list: Array },
      render(h, { props: { value = [], list = [] }, data: { attrs = {}}, listeners: { input }}) {
        return h('el-checkbox-group', { props: { value, ...attrs }, on: { input(v) { input(v) } }}, list.map(o => h('el-checkbox', { props: { ...o, label: o.value, key: o.value }}, [o.label])))
      }
    },
    radioGroup: {
      functional: true,
      props: { value: String, list: Array },
      render(h, { props: { value = '', list = [] }, data: { attrs = {}}, listeners: { input }}) {
        return h('el-radio-group', { props: { value, ...attrs }, on: { input(v) { input(v) } }}, list.map(o => h('el-radio', { props: { ...o, key: o.label }}, [o.value])))
      }
    }
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return null
      } }

  },
  data() {
    const { columns, rowSize = 3 } = this.config

    return {
      TYPE: {
        select: {
          is: 'selectBar',
          clearable: true
        },
        text: {
          is: 'el-input',
          clearable: true
        },
        switch: {
          is: 'el-switch'
        },
        checkbox: {
          is: 'checkbox',
          clearable: true
        },
        checkboxGroup: {
          is: 'checkboxGroup',
          clearable: true
        },
        radioGroup: {
          is: 'radioGroup',
          clearable: true
        },
        daterange: {
          is: 'el-date-picker',
          type: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          editable: false
        },
        date: {
          is: 'el-date-picker',
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          editable: false
        },
        auto: {
          is: 'el-autocomplete'
        }
      },
      // form: columns.reduce((r, c) => Object.assign(r, { [c.prop]: c.is === 'checkboxGroup' ? [] : null }), {}),
      rules: columns.reduce((r, c) => ({ ...r, [c.prop]: c.rules ? c.rules : [] }), {}),
      columns: chunk(columns, rowSize),
      rowSize
    }
  },
  computed: {
    // 注意form放在了这里
    form() {
      const { data } = this.config
      return data
    },
    footer() {
      const { footer = true } = this.config
      return footer
    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    componentAttrs(item) {
      const { is = 'text', label } = item
      const attrs = fromEntries(Object.entries(item).filter(n => !/^(prop|is|rules)/.test(n[0])))
      const placeholder = (/^(select|el-date-picker)/.test(is) ? '选择' : '输入/搜索') + label
      return { ...attrs, ...this.TYPE[is], placeholder }
    },
    reset() {
      this.$refs.form.resetFields()
    },
    /*
     * 这里区分了两种情况(footer默认为true，代表默认会展示封装的form组件所自带的查询、重置按钮)：
     * 1、不使用封装的form组件中自带的查询、重置按钮，则需要使用回调的方式获取form表单的值
     * 2、使用封装的form组件中自带的查询、重置按钮，则需要在使用时通过父组件向封装的form子组件传一个函数submit来获取form表单的值
    */
    submit(cb) {
      // 第一种情况
      !this.footer && this.$refs.form.validate(valid => valid && cb(this.form))
      // 第二种情况
      // this.footer && this.$refs.form.validate(valid => valid && this.$emit('submit', this.form))
      console.log(this.form)
    }
  }
}
</script>

<style scoped>
.width-full{
  width: 80%;
  border: 0px;
}
</style>
