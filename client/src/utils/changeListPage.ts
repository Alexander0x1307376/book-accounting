const changeListPage = (url: string, page: number) => {
  return url.replace(/(\w+)\/(\d+)/, `$1/${page}`);
}

export default changeListPage;