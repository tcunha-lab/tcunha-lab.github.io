# .jekyll-shims.rb
#
# Ruby 3.2+ compatibility shims for Jekyll 3.9 (bundled by github-pages).
# Liquid 4.0.x calls String#tainted? on every rendered value; Ruby removed
# those methods. This file restores them as no-ops.
#
# Load via RUBYOPT so they're defined BEFORE Jekyll/Liquid start:
#   RUBYOPT="-r./.jekyll-shims.rb" bundle exec jekyll serve --livereload
#
# (The project's bin/serve and bin/build wrappers already do this.)

# No-op taint tracking on every object. Yes, every object — Liquid calls
# tainted? on Integers, Hashes, and more, not just Strings.
class Object
  def tainted?; false; end
  def taint;    self;  end
  def untaint;  self;  end
end

# Old numeric constants some gems still reference.
Fixnum = Integer unless defined?(Fixnum)
Bignum = Integer unless defined?(Bignum)
