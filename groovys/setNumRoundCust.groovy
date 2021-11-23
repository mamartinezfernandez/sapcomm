import com.sap.it.api.mapping.*;
import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;
import groovy.xml.MarkupBuilder;
import groovy.xml.*;

def String customFunc(String arg1, MappingContext context){
  
  if(arg1 != '' && arg1 != null){
    
    String xx = arg1
    int ind = xx.indexOf(".")
    ind = ind+1
    String xxs = xx.substring(ind)
    int xxsSize = xxs.size()
    String xxl = ''
    float x
    
    if(xxsSize >= 3){
      xxl = xxs.substring(2)
    }
    
    if(xxl >= '5' && xxl <= '9'){
      x = Float.parseFloat(xx)
      x = x + 0.001
      x = x.round(2)
    }
    else{
      x = Float.parseFloat(xx)
      x = x.round(2)
    }
    
    String val1 = x
    return val1
    
  } 
}
