// parameter : 액션의 타입, promise function
// ======= api 요청시 dispatch 함수를 만들어 주는 함수
/*
Context단에서 
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
와 같은 형태로 호출하여 함수를 만들고 있다. 
*/
export const createAsyncDispatcher = (type, promiseFn) => {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;
    
    // 새로운 함수를 만듭니다.
    // ...rest 를 사용하여 나머지 파라미터를 rest 배열에 담습니다.
    const actionHandler = async (dispatch, ...rest) => {
      console.log(dispatch);
      dispatch({ type }); // 요청 시작됨
      try {
        const data = await promiseFn(...rest); 
        dispatch({
          type: SUCCESS,
          data,
        }); // 성공함
      } catch (e) {
        dispatch({
          type: ERROR,
          error: e,
        }); // 실패함
      }
    };
  
    return actionHandler; // 만든 함수를 반환합니다.
  };
  
  export const initialAsyncState = {
    loading: false,
    data: null,
    error: null,
  };
  
  // 로딩중일 때 바뀔 상태 객체
  const loadingState = {
    loading: true,
    data: null,
    error: null,
  };
  
  // 성공했을 때의 상태 만들어주는 함수
  const success = (data) => ({
    loading: false,
    data,
    error: null,
  });
  
  // 실패했을 때의 상태 만들어주는 함수
  const error = (error) => ({
    loading: false,
    data: null,
    error: error,
  });
  
  // 세 가지 액션을 처리하는 리듀서를 만들어줌    
  // 기존에 중복되는 값들이 많았던 코드들을 함쳐줌!!    
  // type 은 액션 타입, key 는 리듀서에서 사용할 필드 이름
  export function createAsyncHandler(type, key) {
    // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;
  
    // 함수를 새로 만들어서
    function handler(state, action) {
      switch (action.type) {
        case type:
          return {
            ...state,
            [key]: loadingState,
          };
        case SUCCESS:
          return {
            ...state,
            [key]: success(action.data),
          };
        case ERROR:
          return {
            ...state,
            [key]: error(action.error),
          };
        default:
          return state;
      }
    }
  
    // 반환합니다
    return handler;
  }