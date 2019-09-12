validate () {
      return validateAllForm(this.$refs['ContractChange'] && this.$refs['ContractChange'].$refs['quoteChangeForm'], this.$refs['quoteInfoForm'], this.$refs['sales-path'].$refs['tierOnePartner'], this.$refs['sales-path'].$refs['tierOneContact'], this.$refs['sales-path'].$refs['endCustomer'], this.$refs['sales-path'].$refs['endContact'])
    }
