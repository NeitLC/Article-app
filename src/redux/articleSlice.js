import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const WebSocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

export const fetchWebSocketData = createAsyncThunk(
    'articles/fetchWebSocketData',
    async() => {
        const socket = new WebSocket(WebSocketUrl);
        const data = await new Promise((resolve, reject) => {
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
      return data;
    }
);

export const addArticle = createAsyncThunk(
    'article/addArticle',
    async(article) => {
        const socket = new WebSocket(WebSocketUrl);
        const data = await new Promise((resolve, reject) => {
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
      return data;
    }
);

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async (id) => {
      const socket = new WebSocket(WebSocketUrl);
      const data = await new Promise((resolve, reject) => {
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
      return data;
    }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {
    setArticlesFromLocalStorage: (state, action) => {
      state.articles = action.payload;
    },
  },
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

export const { setArticlesFromLocalStorage } = articlesSlice.actions;

export default articlesSlice.reducer;