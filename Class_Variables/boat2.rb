class Boat
  attr_reader :in, :out
  @@in = 0
  @@out = 0

  def self.Checkin()
    self.in += 1
    self.out -= 1
    @@in += 1
    @@out -= 1
    # Boat.in += 1
    # Boat.out -= 1

  end

  def self.Checkout()
    if self.in > 0
      self.in -= 1
      self.out += 1
      @@in -= 1
      @@out += 1
      # Boat.in -= 1
      # Boat.out += 1
      return true
    end
    false
  end

  def self.StartMorning
    self.in = 10
    # Boat.in += 10
    @@in += 10
    puts "class : #{@@in}"
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

  def self.boatsin
    @@in
  end
  def self.boatsout
    @@out
  end
end


class Sailboat < Boat
end

class Motorboat < Boat
end


def print_boats_status
  puts "Sailboats in: #{Sailboat.in}"
  puts "Motorboats in: #{Motorboat.in}"
  puts
  puts "Sailboats out: #{Sailboat.out}"
  puts "Motorboat out: #{Motorboat.out}"
  puts
  puts "Boats in: #{Boat.in}"
  puts "Boats out: #{Boat.out}"
  puts "----------------------------------"
end

Sailboat.StartMorning
Motorboat.StartMorning
print_boats_status

2.times { Sailboat.Checkout }
6.times { Motorboat.Checkout }

print_boats_status


#
# Sailboat.Checkout
# Motoboat.Checkout
#
# Boat.in
# Sailboat.in
# Boat.out
# Motorboat.out
#
