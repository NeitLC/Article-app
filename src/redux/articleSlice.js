import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchWebSocketData = createAsyncThunk(
    'articles/fetchWebSocketData',
    async() => {
        const socket = new WebSocket('wss://ws.postman-echo.com/raw');
        return new Promise((resolve, reject) => {
            socket.onopen = () => {
                console.log('WebSocket connection established');
            };
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                resolve(data);
            };
            socket.onerror = (error) => {
                reject(error);
            };
            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        });
    }
);

export const addArticle = createAsyncThunk(
    'article/addArticle',
    async(article) => {
        const socket = new WebSocket('wss://ws.postman-echo.com/raw');
        return new Promise((resolve, reject) => {
            socket.onopen = () => {
              socket.send(JSON.stringify(article));
            };
            socket.onmessage = (event) => {
              const data = JSON.parse(event.data);
              resolve(data);
            };
            socket.onerror = (error) => {
              reject(error);
            };
            socket.onclose = () => {
              console.log('WebSocket connection closed');
            };
        });
    }
);

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async (id) => {
      const socket = new WebSocket('wss://ws.postman-echo.com/raw');
      return new Promise((resolve, reject) => {
        socket.onopen = () => {
          socket.send(JSON.stringify({ type: 'del', id }));
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
        };
        socket.onerror = (error) => {
          reject(error);
        };
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
      });
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        article: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWebSocketData.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchWebSocketData.fulfilled, (state, action) => {
          state.loading = false;
          state.articles = action.payload;
        })
        .addCase(fetchWebSocketData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addArticle.pending, (state) => {
          state.loading = true;
        })
        .addCase(addArticle.fulfilled, (state, action) => {
          state.loading = false;
          state.articles.push(action.payload);
        })
        .addCase(addArticle.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteArticle.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteArticle.fulfilled, (state, action) => {
          state.loading = false;
          state.articles = state.articles.filter((article) => article.id !== action.payload.id);
        })
        .addCase(deleteArticle.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });  
    },
});

export default articlesSlice.reducer;