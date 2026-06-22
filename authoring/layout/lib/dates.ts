const articleDateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium"
})

export const formatArticleDate = (date: Date) => articleDateFormatter.format(date)
