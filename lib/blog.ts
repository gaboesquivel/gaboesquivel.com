import { blogs } from '#velite'

export type Blog = (typeof blogs)[number]

export const allBlogs = blogs
