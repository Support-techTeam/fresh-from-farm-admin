import {
  DataProvider,
  Identifier,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  fetchUtils,
} from "react-admin";
import BaseDirectories from "../base_directory/BaseDirectory";
import apiClient from "../apiClient";

const apiUrl = `${BaseDirectories.BASE_API_URL}/admin`; // Replace with your actual API URL

const restDataProvider: DataProvider = {
  getList: async (resource: string, params: any) => {
    console.info("getList", resource);
    try {
      const url = `${apiUrl}/${resource}`;
      const response = await apiClient.get(url, { params });
      const total = response.data.data.length;
      // Map the response data to include an 'id' property
      const data = response.data.data.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      console.log("GET", data);
      return {
        data,
        total,
      };
    } catch (error) {
      console.error("Error fetching list:", error);
      // Handle error response according to your application logic
      return Promise.resolve({
        data: [],
        total: 0,
      });
    }
  },

  getOne: async (resource: string, params: any) => {
    console.log("GET", resource, params.id);
    try {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const response = await apiClient.get(url);
      const total = response.data.data.length;
      // Map the response data to include an 'id' property
      const data = response.data.data;
      console.log("GET", data);
      const formattedData = {
        ...data,
        id: data._id, // Use your ID field here
      };
      console.log("GET", formattedData);
      return {
        data: formattedData,
        total,
      };
    } catch (error) {
      //   console.error("Error fetching list:", error);
      // Handle error response according to your application logic
      return Promise.resolve({
        data: [],
        total: 0,
      });
    }
  },

  create: async (resource: string, params: any) => {
    const formData = new FormData();
    console.log("imageSrc", formData);

    // Convert 'true'/'false' strings to boolean and handle file uploads
    Object.keys(params.data).forEach((key: string) => {
      const value = params.data[key];

      if (key === "imageSrc" && value?.rawFile) {
        // Append the file separately
        formData.append("file", value.rawFile);
      } else if (key === "bestSeller" || key === "specialOffer") {
        // Convert 'true'/'false' strings to boolean
        formData.append(
          key,
          value === "true" ? true : value === "false" ? false : value
        );
      } else {
        // Append other fields
        formData.append(key, value);
      }
    });
    const url = `${apiUrl}/${resource}`;
    const response = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data.data;
    const formattedData = {
      ...data,
      id: data._id, // Use your ID field here
    };
    return { data: formattedData };
  },

  update: async (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    // const token = localStorage.getItem("authToken");
    const token: any =  localStorage.getItem("f3_user_data");
    console.log(JSON.parse(token)['accessToken'], "refreshToken");
    const oldToken = JSON.parse(token)['accessToken'];
    const response = await apiClient.put(url, params.data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${oldToken}`,
      },
    });
    const data = response.data.data;
    const formattedData = {
      ...data,
      id: data._id, // Use your ID field here
    };
    return { data: formattedData };
  },

  delete: async (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await apiClient.delete(url);
    return { data: params.previousData };
  },

  deleteMany: async (resource: string, params: any) => {
    await Promise.all(
      params.ids.map((id: number) =>
        apiClient.delete(`${apiUrl}/${resource}/${id}`)
      )
    );
    return { data: params.ids };
  },

  getMany: async (resource: string, params: any) => {
    // Construct the URL with query parameters
    // Assuming your API expects ids as a comma-separated list, adjust if needed
    const url = `${apiUrl}/${resource}`;
    const { ids } = params;

    // Make the API request with the IDs as a query parameter
    try {
      const response = await apiClient.get(url, { params: { id: ids.join(",") } });
      const total = response.data.data.length;
      // Map the response data to include an 'id' property
      const data = response.data.data.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      // Return data in the expected format
      console.log("RETURN", data);
      return { data: data };
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getManyReference: async (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}`;
    const response = await apiClient.get(url, { params });
    const total = response.data.data.length;
    // Map the response data to include an 'id' property
    const data = response.data.data.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return {
      data: data,
      total,
    };
  },
  updateMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default restDataProvider;
