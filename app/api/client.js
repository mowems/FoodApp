import { create } from "apisauce";
import AuthStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://ciaochow.plusnarrative.biz/api',
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await AuthStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
})

export default apiClient;

