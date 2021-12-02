def String customFunc(String arg1, MappingContext context){

    def body = context.getProperty('B1');
    def xml = new XmlSlurper().parseText(body);

    String curr1 = ''
    String exchangeRate1 = ''

    def value1 = xml.terminalFinaliseTransaction.cmTenderItem.find{ cmTenderItem ->
        cmTenderItem.itemType.text() == 'Expected'      
    }

    curr1 = value1.currency
    exchangeRate1 = value1.exchangeRate

    if(value1==null){
        return 'no exists'
    }
    else{
        if(curr1 != 'GBP'){
            def value2 = xml.terminalFinaliseTransaction.cmTenderItem.find{ cmTenderItem ->
                cmTenderItem.itemType.text() == 'Sale' && cmTenderItem.currency.text() == curr1        
            }
            if(value2==null){
                return 'no exists'
            }
            else{
                return exchangeRate1
            }
        }

    }            

}
