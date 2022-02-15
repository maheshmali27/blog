import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    postItem: {
        '&:hover': {
          boxShadow: '0px 5px 10px 1px #0003'
        }
    },
    itemContent: {
      padding: '10px'
    },
    metaInfo: {
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    metaInfo__publishTime: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
}));