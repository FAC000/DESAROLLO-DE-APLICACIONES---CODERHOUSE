import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/dataBase";

export const PeliApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['profileImageGet'], 
  endpoints: (builder) => ({
    getPeliculas: builder.query({
      query: () => `peliculas.json`,
    }),
    getPeliculasById: builder.query({
      query: (productId) => `peliculas/${productId}.json`,
    }),

    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: (result, error, localId) => [
        { type: 'profileImageGet', id: localId }, 
      ],
    }),

    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: [{ type: 'profileImageGet', id: 'PROFILE_IMAGE' }], 
    }),
  }),
});

export const {
  useGetPeliculasQuery,
  useGetPeliculasByIdQuery,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} = PeliApi;
