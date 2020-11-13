const mapIdAndKey = list => list.reduce((c, i) => ({ ...c, [i.key]: i }), {})

const STATUS = {
  order: mapIdAndKey([
    {
      id: 'draft',
      key: 'CREATED',
      val: '未提交'
    },
    {
      id: 'pending',
      key: 'IN_APPROVAL',
      val: '审批中'
    },
    {
      id: 'reject',
      key: 'REJECT',
      val: '审批驳回'
    },
    {
      id: 'refuse',
      key: 'REFUSE',
      val: '审批拒绝'
    },
    {
      id: 'sign',
      key: 'CONTRACT_IN_SIGN',
      val: '合同签署中'
    },
    {
      id: 'signDone',
      key: 'CONTRACT_SIGNED',
      val: '合同签署成功'
    },
    {
      id: 'lendDone',
      key: 'LENDED',
      val: '放款成功'
    },
    {
      id: 'lendReject',
      key: 'LOAN_REJECT',
      val: '放款驳回'
    },
    {
      id: 'cancel',
      key: 'CANCEL',
      val: '取消成功'
    },
    {
      id: 'inLend',
      key: 'IN_LOAN',
      val: '放款审批中'
    }
  ]),
  monitor: mapIdAndKey([
    {
      key: '00',
      val: '完成'
    },
    {
      key: '01',
      val: '未完成'
    }
  ]),
  allot: mapIdAndKey([
    {
      id: '0',
      key: '0',
      val: '申请调拨'
    },
    {
      id: '1',
      key: '1',
      val: '审批通过'
    },
    {
      id: '2',
      key: '2',
      val: '已出库'
    },
    {
      id: '3',
      key: '3',
      val: '已入库'
    }
  ])
}

export default {
  functional: true,
  render(h, { props: { value, Enum, empty }, parent }) {
    const enums = Object.assign({}, STATUS, parent.$store.getters.dictionary)
    const { name = '', getVal = (values, v) => values[v] } = Enum; const _value = getVal(enums[name], value)

    if (_value === undefined) return h('span', _value === undefined ? empty : _value)

    const { id, val } = _value
    return h('span', { staticClass: id }, [h('span', val)])
  }
}
