Creating Hashes

grades = { "Jane Doe" => 10, "Jim Doe" => 6 }           #Using strings for keys
options = { :font_size => 10, :font_family => "Arial" }  #Using symbols for keys
my_hash = Hash.new(default_value)                 #if a value is requested for a key not in the hash, return the default value

options = { font_size: 10, font_family: "Arial" }        #Alt construction, note ':' is at end of sym
optios = Hash[:font_size, 10, :font_family, "Arial"]    #Alt contruct using array

Accessing Hashes

options[:font-size]  #=> 10
options[:font-size] = 12

creating named parameters


font_info(color: "blue", font_size: 12)     #if a hash is the last parameter, no brackets are needed.
                                            #note ':' is after the key
def font_info(params)
    @color = params[:color]
    @font_size = params[:font-size]
end

To compare two hashes, override the '==' method

def ==(other)
  self.class === other and
      other.author == @author and
      other.title == @title
end
book1 = [author: "Twain", title: "Tom Sawyer"]
book2 = Hash[:author, "Twain", :title, "Tom Sawyer"]
book1 == book2 #=> true

methods
.clear
h.default
h.default = 2.delete(key)
.keys


iterators
any?
delete_if{|key,value| block}


h.de

------Missing from Array
.shift
.flatten out of alphabetic
.each_index
.shuffle
.uniq
.values_at
Combine the ones that take blocks with methods