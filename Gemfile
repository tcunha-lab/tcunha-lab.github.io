source "https://rubygems.org"

# GitHub Pages-compatible Jekyll setup.
# The github-pages gem pins Jekyll and plugins to versions GitHub Pages supports,
# so what you see locally matches what gets built when you push.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Platform-specific gems required by Jekyll
gem "tzinfo-data", platforms: [:mingw, :x64_mingw, :mswin, :jruby]
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Webrick is not bundled with Ruby 3+
gem "webrick", "~> 1.7"

# Standard library gems that Ruby 3.4+ removed from the defaults but that
# Jekyll 3.9 (shipped by github-pages) still expects to load.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "mutex_m"
gem "ostruct"
