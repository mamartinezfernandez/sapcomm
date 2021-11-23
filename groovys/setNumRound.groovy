import com.sap.it.api.mapping.*;
import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;
import groovy.xml.MarkupBuilder;
import groovy.xml.*;

def String customFunc(String arg1, MappingContext context){
  
  if(arg1 != '' && arg1 != null){
    
    String xx = arg1
  
    float x = Float.parseFloat(xx);
    float a = x.round(2)
  
    String aa = a
  
    return a
   
  } 
}
