class Boat
# @@in = 0
# @@out = 0

  def initialize
    self.in ||= 10 #initialize to 10 if doesn't exist yet
    self.out ||= 0
  end

  def self.put_in_service
    self.in += 1
    Boat.in += 1
  end

  def self.take_out_of_service
    if self.in > 0
      self.in -= 1
      Boat.in -= 1
      return true
    end
    false
  end

  def self.Checkin()
    self.in += 1
    self.out -= 1
    Boat.in += 1
    Boat.out -= 1

  end

  def self.Checkout()
    if self.in > 0
      self.in -= 1
      self.out += 1
      Boat.in -= 1
      Boat.out += 1
      return true
    end
    false
  end

  def self.in
    @in ||= 0
  end

  def self.in=(num)
    @in = num
  end

  def self.out
    @out ||= 0
  end

  def self.out=(num)
    @out=num
  end

end

class Sailboat < Boat
end

class Motorboat < Boat
end

10.times { Sailboat.put_in_service }
10.times { Motorboat.put_in_service }

puts "Sailboats in: #{Sailboat.in}"
puts "Motorboats in: #{Motorboat.in}"

puts "Sailboats out: #{Sailboat.out}"
puts "Motorboat out: #{Motorboat.out}"

puts "Boats in: #{Boat.in}"
puts "Boats out: #{Boat.out}"

Sailboat.Checkout
Sailboat.Checkout
Motorboat.Checkout
Motorboat.Checkout
Motorboat.Checkout
Motorboat.Checkout

puts "Sailboats in: #{Sailboat.in}"
puts "Sailboats out: #{Sailboat.out}"
puts "Motorboats in: #{Motorboat.in}"
puts "Motorboat out: #{Motorboat.out}"


#
# Sailboat.Checkout
# Motoboat.Checkout
#
# Boat.in
# Sailboat.in
# Boat.out
# Motorboat.out
#
