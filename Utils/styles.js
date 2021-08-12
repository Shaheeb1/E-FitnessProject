import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
 // {
   // margin: 0;
   // padding: 0;
    //box-sizing: border-box;

  //}
//changing navbar properties
  navbar: {
    backgroundColor: '#add8e6',
    '& a': {
      color: '#040404',
      marginLeft: 8,
    },
  },
//changing logo properties
  brand: {
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },
//changing website properties
  grow: {
    flexGrow: 1.1,
  },
//changing content properties
  main: {
    minHeight: '100vh',
    
  },
//changing footer properties
footer: {
  marginTop: 5,
  textAlign: 'center',

},

s: {
  marginTop: 8,
  marginBottom: 8,
},
//changing form input properties
form: {
  maxWidth: 800,
  margin: '0 auto',
},
//Changin navbar properties
navbarButton: {
  color: '#ffffff',
  textTransform: 'intial',
},

transparentBackground: {
  backgroundColor: 'transparent',
},
//when user inputs wrong details, displays ambient red colour
error: {
  color: '#f04040',
},

});

export default useStyles;