import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import React, { useState } from 'react'


export default function DrawerC () {
  const [openM, closeM] = useState(true);


  return (
    <div>
      
    <Drawer 

    onClose={()=>closeM(false)}
    open={openM}
      
    >
    <List>
       <ListItem divider button>
          <ListItemIcon> 
              Weights
           </ListItemIcon>
       
       </ListItem>
       <ListItem divider button>
          <ListItemIcon> 
              Treadmills
           </ListItemIcon>
       
       </ListItem>
       <ListItem divider button>
          <ListItemIcon> 
              Nutrition
           </ListItemIcon>
       
       </ListItem>
       <ListItem divider button>
          <ListItemIcon> 
              Supplements
           </ListItemIcon>
       
       </ListItem>
    </List>
  </Drawer>
    </div>
  );
}

