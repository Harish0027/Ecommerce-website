import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  CLEAR_ERROR,
} from "../Constants/ProductConstants";

export const getProduct = (keyword = "", currentPage = 1,price=[0,25000],category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let link = `http://localhost:4000/api/v1/products/getAll?keyword=${keyword}&page=${currentPage}`;

    if(category){
       link=`http://localhost:4000/api/v1/products/getAll?keyword=${keyword}&page=${currentPage}&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetail=(id)=>async(dispatch)=>{
  try{
    dispatch({type:PRODUCT_DETAIL_REQUEST});
    const {data}=await axios.get(`http://localhost:4000/api/v1/products/get/${id}`)
    dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data.data});
  
  }catch(error){
    dispatch({type:PRODUCT_DETAIL_FAIL,payload:{
      payload: error.response?.data?.message || error.message,
    }});

  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
