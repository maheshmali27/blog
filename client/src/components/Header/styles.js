import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    headerContainer: {
        position: 'unset !important',
        padding: '10px 20px',
        backgroundColor: '#03488d !important'
    },
    searchContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '5px 5px 5px 0px',
        backgroundColor: '#013364',
        borderRadius: '50px'
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        top: '25%',
        left: '10px',
        justifyContent: 'center',
        pointerEvents: 'none',
        alignItems: 'center'
    },
    siteBrand: {
        textDecoration: 'none',
        color: '#fff',
        '&:before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '1px',
            width: 0,
            backgroundColor: '#fff',
            transition: 'all 0.3s'
        },
        '&:hover:before': {
            width: '100%'
        }
    }
}));