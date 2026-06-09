# _plugins/polyfills.rb
#
# Compatibility shim for running Jekyll 3.9 (bundled by the `github-pages`
# gem) on modern Ruby (3.2+). These methods were removed from Ruby but
# the old Liquid/Jekyll code still calls them.
#
# Local-only: GitHub Pages ignores _plugins/ (safe mode) but its Ruby
# doesn't need these shims anyway. Safe to delete once we migrate to
# Jekyll 4 + GitHub Actions deployment.

warn "[polyfills] Loading Ruby 3.2+ compatibility shims for Jekyll 3.9..."

# Add no-op versions of the removed taint methods to both Object and String
# (String explicitly, in case of any lookup oddity).
class Object
  def tainted?; false; end
  def taint;    self;  end
  def untaint;  self;  end
end

class String
  def tainted?; false; end
  def taint;    self;  end
  def untaint;  self;  end
end

# Old constants that some libraries reference.
Fixnum = Integer unless defined?(Fixnum)
Bignum = Integer unless defined?(Bignum)

warn "[polyfills] Done."
